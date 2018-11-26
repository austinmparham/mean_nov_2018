import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MongooseComponent } from './mongoose.component';

describe('MongooseComponent', () => {
  let component: MongooseComponent;
  let fixture: ComponentFixture<MongooseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MongooseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MongooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
