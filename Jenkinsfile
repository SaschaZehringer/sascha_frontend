def getRegistry() {
    return "zehringer.net";
}

def getOrgName() {
    def tmp = env.GIT_URL.tokenize("/") as String[];

    orgName = tmp[-2].toLowerCase();

    return orgName;
}

def getRepoName() {
    def tmp = env.GIT_URL.tokenize("/") as String[];
    def tmp2 = tmp[-1].toLowerCase();
    def tmp3 = tmp2.tokenize(".") as String[];

    repoName = tmp3[0];

    return repoName;
}

def getBranchName() {
    return env.BRANCH_NAME;
}

def getAppVersion() {
    def version = sh(script: "node -p \"require('./package.json').version\"", returnStdout: true).trim()

    return version
}

def getNodeVersion() {
    def nodeVersionRange = sh(script: "node -p \"require('./package.json').engines.node\"", returnStdout: true).trim()

    def tmp = nodeVersionRange.tokenize("\\|\\|") as String[]
    def tmp2 = tmp[-1].tokenize('.') as String[]
    def nodeVersion = tmp2[0].toLowerCase()

    return nodeVersion.trim()
}

pipeline {
    agent {
        label 'angular'
    }

    options {
        copyArtifactPermission('*')
    }

    environment {
        REGISTRY_NAME = getRegistry()
        ORG_NAME = getOrgName()
        REPO_NAME = getRepoName()
        BRANCH_NAME = getBranchName();
        NODE_VERSION = getNodeVersion();
        APP_VERSION = getAppVersion();
    }

    stages {
        stage('install'){
            steps {
                nodejs(nodeJSInstallationName: "Node ${NODE_VERSION}") {
                    sh 'npm ci'
                    sh 'npm install --only=dev'
                }
            }
        }
        stage('build') {
            steps {
                nodejs(nodeJSInstallationName: "Node ${NODE_VERSION}") {
                    sh 'npm run build'
                }
            }
        }
        stage('lint') {
            steps {
                nodejs(nodeJSInstallationName: "Node ${NODE_VERSION}") {
                    sh 'npm run lint'
                }
            }
        }
        stage('test') {
            steps {
                nodejs(nodeJSInstallationName: "Node ${NODE_VERSION}") {
                    sh 'npm run test:coverage'
                    sh 'tar -czf coverage.tar.gz coverage/sascha-frontend/*'
                }
            }
        }
        stage('pack') {
            steps {
                nodejs(nodeJSInstallationName: "Node ${NODE_VERSION}") {
                    sh 'npm pack'
                    sh 'npm run build'
                    sh 'tar -czf webpack.tar.gz dist/*'
                }
            }
        }
        stage("container") {
            when {
                anyOf {
                    branch "master"
                    branch "production"
                    branch "staging"
                    expression {
                        return env.BRANCH_NAME ==~ /release\/\d+\.\d+\.\d+/
                    }
                }
            }
            parallel {
                stage("docker") {
                    agent {
                        label "docker_image"
                    }
                    steps {
                        sh "docker image build -t ${REGISTRY_NAME}/${ORG_NAME}/${REPO_NAME}:${APP_VERSION} -f container/Containerfile ."
                        sh "docker image build -t ${REGISTRY_NAME}/${ORG_NAME}/${REPO_NAME}:${BRANCH_NAME} -f container/Containerfile ."

                        if (env.BRANCH_NAME == 'master') {
                            sh "docker image build -t ${REGISTRY_NAME}/${ORG_NAME}/${REPO_NAME}:latest -f container/Containerfile ."
                        }

                        sh "docker image push ${REGISTRY_NAME}/${ORG_NAME}/${REPO_NAME}:${APP_VERSION}"
                        sh "docker image push ${REGISTRY_NAME}/${ORG_NAME}/${REPO_NAME}:${BRANCH_NAME}"

                        if (env.BRANCH_NAME == 'master') {
                            sh "docker image push ${REGISTRY_NAME}/${ORG_NAME}/${REPO_NAME}:latest"
                        }
                    }
                }
                stage("podman") {
                    agent {
                        label "podman_image"
                    }
                    steps {
                        sh "podman image build -t ${REGISTRY_NAME}/${ORG_NAME}/${REPO_NAME}:${APP_VERSION} -f container/Containerfile ."
                        sh "podman image build -t ${REGISTRY_NAME}/${ORG_NAME}/${REPO_NAME}:${BRANCH_NAME} -f container/Containerfile ."

                        if (env.BRANCH_NAME == 'master') {
                            sh "podman image build -t ${REGISTRY_NAME}/${ORG_NAME}/${REPO_NAME}:latest -f container/Containerfile ."
                        }

						sh "podman image push ${REGISTRY_NAME}/${ORG_NAME}/${REPO_NAME}:${APP_VERSION}"
						sh "podman image push ${REGISTRY_NAME}/${ORG_NAME}/${REPO_NAME}:${BRANCH_NAME}"

                        if (env.BRANCH_NAME == 'master') {
                            sh "podman image push ${REGISTRY_NAME}/${ORG_NAME}/${REPO_NAME}:latest"
                        }
                    }
                }
            }
        }
    }

    post {
        success {
            archiveArtifacts artifacts: '*.tar', allowEmptyArchive: true
            archiveArtifacts artifacts: '*.tgz', allowEmptyArchive: true
            archiveArtifacts artifacts: '*.tar.gz', allowEmptyArchive: true
        }
        always {
            archiveArtifacts artifacts: '*.log', allowEmptyArchive: true
        }
        cleanup {
            cleanWs()
            dir("${workspace}@tmp") {
                deleteDir()
            }
        }
    }
}
