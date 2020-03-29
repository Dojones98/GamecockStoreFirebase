import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrderListFinalPage } from './order-list-final.page';

describe('OrderListFinalPage', () => {
  let component: OrderListFinalPage;
  let fixture: ComponentFixture<OrderListFinalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderListFinalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrderListFinalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
