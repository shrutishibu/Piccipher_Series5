import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageDisplayPage } from './image-display.page';

describe('ImageDisplayPage', () => {
  let component: ImageDisplayPage;
  let fixture: ComponentFixture<ImageDisplayPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ImageDisplayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
