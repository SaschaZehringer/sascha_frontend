import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Navbar } from './navbar';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar]
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set light mode if localStorage theme is light on init', () => {
    spyOn(localStorage, 'getItem').and.returnValue('light');
    // @ts-expect-error Access private method for testing
    spyOn(component, 'setLightMode');
    component.ngOnInit();
    // @ts-expect-error TS access private method for testing
    expect(component.setLightMode).toHaveBeenCalledWith(true);
  });

  it('should not set light mode if localStorage theme is not light on init', () => {
    spyOn(localStorage, 'getItem').and.returnValue('dark');
    // @ts-expect-error Access private method for testing
    spyOn(component, 'setLightMode');
    component.ngOnInit();
    // @ts-expect-error TS access private method for testing
    expect(component.setLightMode).not.toHaveBeenCalled();
  });

  it('should toggle menuOpen when toggleMenu is called', () => {
    expect(component.menuOpen).toBe(false);
    component.toggleMenu();
    expect(component.menuOpen).toBe(true);
    component.toggleMenu();
    expect(component.menuOpen).toBe(false);
  });

  it('should toggle theme and update localStorage when toggleTheme is called', () => {
    spyOn(localStorage, 'setItem');
    component.isLightMode = false;
    component.toggleTheme();
    expect(component.isLightMode).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
    component.toggleTheme();
    expect(component.isLightMode).toBe(false);
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  it('should set light mode and update body class in setLightMode', () => {
    const body = document.body;
    // @ts-expect-error Access private method for testing
    component.setLightMode(true);
    expect(component.isLightMode).toBe(true);
    expect(body.classList.contains('light-mode')).toBe(true);
    // @ts-expect-error Access private method for testing
    component.setLightMode(false);
    expect(component.isLightMode).toBe(false);
    expect(body.classList.contains('light-mode')).toBe(false);
  });
});
