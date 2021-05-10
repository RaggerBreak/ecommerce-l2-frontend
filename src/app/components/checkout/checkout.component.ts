import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ShopFormService} from '../services/shop-form.service';
import {Country} from '../common/country';
import {State} from '../common/state';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(private formBuilder: FormBuilder,
              private shopFormService: ShopFormService) { }

  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    // populate credit card months
    const startMonth: number = new Date().getMonth() + 1;
    this.shopFormService.getCreditCardMonths(startMonth).subscribe(data => {
      this.creditCardMonths = data;
    });

    // populate credit card years
    this.shopFormService.getCreditCardYears().subscribe(data => {
      this.creditCardYears = data;
    });

    // populate countries
    this.shopFormService.getCountries().subscribe(data => {
      this.countries = data;
    });

  }

  onSubmit(): void {

  }

  copyShippingAddressToBillingAddress(event): void {

    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
      this.billingAddressStates = this.shippingAddressStates;

    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();

      this.billingAddressStates = [];
    }

  }

  handleMonthsAndYears(): void {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    } else {
      startMonth = 1;
    }

    this.shopFormService.getCreditCardMonths(startMonth).subscribe(data => {
      this.creditCardMonths = data;
    });
  }

  getStates(formGroupName: string): void {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup.value.country.code;

    this.shopFormService.getStates(countryCode).subscribe(data => {
      if (formGroupName === 'shippingAddress') {
        this.shippingAddressStates = data;
      }
      else {
        this.billingAddressStates = data;
      }

      formGroup.get('state').setValue(data[0]);
    });
  }

}
