import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Navbar } from './navbar/navbar';
import { IPersonalInfo } from './interfaces/personal-info.interface';
import { IEducation } from './interfaces/education.interface';
import { IProject } from './interfaces/project.interface';
import { IExperience } from './interfaces/experience.interface';
import { ISkill } from './interfaces/skill.interface';
import { LanguageService } from './services/language.service';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
// import { LoginComponent } from './login/login';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Navbar, RouterModule, FormsModule, TranslateModule], //, LoginComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements OnInit {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private languageService = inject(LanguageService);

  protected title = 'Sascha Zehringer';
  private language = 'de';

  constructor() {
    this.setTitle(this.title);
  }

  setTitle(newTitle: string): void {
    document.title = newTitle;
  }

  personalInfo: IPersonalInfo = {
    firstName: '',
    lastName: '',
    jobTitle: '',
    contact: {
      emails: [],
      phone: '',
      country: '',
      city: '',
      websites: [],
    },
    summary: [],
  };

  // Skills
  privateSkills: ISkill[] = [];
  academicSkills: ISkill[] = [];
  professionallySkills: ISkill[] = [];

  // Experience
  experiences: IExperience[] = [];

  // Projects
  projects: IProject[] = [];

  // Education
  educations: IEducation[] = [];

  ngOnInit(): void {
    // Subscribe to language changes and reload data when language changes
    this.languageService.language$.subscribe((language) => {
      this.language = language;
      this.loadAll();
    });
  }

  private loadAll(): void {
    // Clear existing data to prevent duplicates
    this.clearData();

    // Load all data with current language
    this.loadPersonalInfo();
    this.loadSkills();
    this.loadExperience();
    this.loadProjects();
    this.loadEducation();
  }

  private clearData(): void {
    // Clear skills arrays
    this.privateSkills = [];
    this.academicSkills = [];
    this.professionallySkills = [];

    // Clear other arrays
    this.experiences = [];
    this.projects = [];
    this.educations = [];

    // Reset personal info
    this.personalInfo = {
      firstName: '',
      lastName: '',
      jobTitle: '',
      contact: {
        emails: [],
        phone: '',
        country: '',
        city: '',
        websites: [],
      },
      summary: [],
    };
  }

  private loadPersonalInfo(): void {
    this.http
      .get<IPersonalInfo>(
        `${this.apiUrl}/personal-info/1?language=${this.language}`
      )
      .subscribe((data: IPersonalInfo) => {
        this.personalInfo.firstName = data.firstName || '';
        this.personalInfo.lastName = data.lastName || '';
        this.personalInfo.jobTitle = data.jobTitle || '';
        this.personalInfo.contact = data.contact || {};
        this.personalInfo.summary = data.summary || [];
      });
  }

  private loadSkills(): void {
    this.http
      .get<ISkill[]>(`${this.apiUrl}/skills`)
      .subscribe((data: ISkill[]) => {
        data.forEach((o) => {
          const skill: ISkill = {
            name: o.name || '',
            skillSource: o.skillSource || 'private',
            experienceDuration: o.experienceDuration || 0,
            experienceTimeUnit: o.experienceTimeUnit || '',
            skillLevel: o.skillLevel || 0,
            skillProject: o.skillProject || [],
          };

          switch (skill.skillSource) {
            case 'academic':
              this.academicSkills.push(skill);
              break;
            case 'professionally':
              this.professionallySkills.push(skill);
              break;
            default:
              this.privateSkills.push(skill);
              break;
          }
        });
      });
  }

  private loadExperience(): void {
    this.http
      .get<IExperience[]>(`${this.apiUrl}/experience`)
      .subscribe((data: IExperience[]) => {
        data.forEach((o) => {
          const experience: IExperience = {
            company: o.company || '',
            role: o.role || '',
            periodBegin: new Date(o.periodBegin),
            periodEnd: new Date(o.periodEnd),
            description: o.description || '',
          };

          this.experiences.push(experience);
        });
      });
  }

  private loadProjects(): void {
    this.http
      .get<IProject[]>(`${this.apiUrl}/project`)
      .subscribe((data: IProject[]) => {
        data.forEach((o) => {
          const project: IProject = {
            id: o.id || 0,
            name: o.name || '',
            description: o.description || '',
            projectLinks: o.projectLinks || [],
          };

          console.log(o);
          console.log(project);

          this.projects.push(project);
        });
      });
  }

  private loadEducation(): void {
    this.http
      .get<IEducation[]>(`${this.apiUrl}/education`)
      .subscribe((data: IEducation[]) => {
        data.forEach((o) => {
          const education: IEducation = {
            id: o.id || 0,
            degree: o.degree || '',
            degreeType: o.degreeType || '',
            institution: o.institution || '',
            institutionLocation: o.institutionLocation || '',
            periodBegin: new Date(o.periodBegin),
            periodEnd: new Date(o.periodEnd),
          };

          this.educations.push(education);
        });
      });
  }

  get maxLength(): number[] {
    const max = Math.max(
      this.privateSkills.length,
      this.academicSkills.length,
      this.professionallySkills.length
    );
    return Array(max)
      .fill(0)
      .map((_, i) => i);
  }

  protected hasSkillProjects(skill: ISkill): boolean {
    return skill.skillProject.some((o) => o.project);
  }

  protected getDomain(link: string): string {
    try {
      const parsed = new URL(link);
      return parsed.hostname;
    } catch (e) {
      console.error('Ungültige URL:', e);
      return "";
    }
  }
}
