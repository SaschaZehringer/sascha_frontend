import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, HttpClientModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.personalInfo = {
      name: 'Sascha Zehringer',
      jobTitle: '',
      contact: { emails: [], phone: '', location: '', websites: [] },
      summary: []
    };
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Sascha Zehringer');
  });

  it('should load personal info with fallback values', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    const http = fixture.debugElement.injector.get(HttpClient);
    spyOn(http, 'get').and.returnValue(of({
      name: '',
      jobTitle: '',
      contact: {
        emails: [],
        phone: '',
        location: '',
        websites: []
      },
      summary: ''
    }));
    app['loadPersonalInfo']();
    expect(app.personalInfo.name).toBe('');
    expect(app.personalInfo.jobTitle).toBe('');
    expect(app.personalInfo.contact).toEqual({
      emails: [],
      phone: '',
      location: '',
      websites: []
    });
    expect(app.personalInfo.summary).toBe('');
  });

  it('should load personal info with real data', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    const http = fixture.debugElement.injector.get(HttpClient);
    const mockData = {
      name: 'Test Name',
      jobTitle: 'Test Job',
      contact: {
        emails: ['test@example.com'],
        phone: '123456789',
        location: 'Test Location',
        websites: ['https://example.com']
      },
      summary: ['Test summary']
    };
    spyOn(http, 'get').and.returnValue(of(mockData));
    app['loadPersonalInfo']();
    expect(app.personalInfo.name).toBe(mockData.name);
    expect(app.personalInfo.jobTitle).toBe(mockData.jobTitle);
    expect(app.personalInfo.contact).toEqual(mockData.contact);
    expect(app.personalInfo.summary).toEqual(mockData.summary);
  });
});
