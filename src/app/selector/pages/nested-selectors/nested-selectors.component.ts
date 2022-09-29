import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of, switchMap, tap } from 'rxjs';
import { CountrySmall } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-nested-selectors',
  templateUrl: './nested-selectors.component.html'
})
export class NestedSelectorsComponent implements OnInit {

  public form: FormGroup = this.fb.group({
    region: ['', [Validators.required]],
    country: [{ value: '', disabled: true }, [Validators.required]],
    border: [{ value: '', disabled: true }, [Validators.required]]
  });

  public regions: string[] = [];

  public countries: CountrySmall[] = [];

  public borders: CountrySmall[] = [];

  public loading: boolean = false;

  public alertMessage: boolean = false;

  constructor(private fb: FormBuilder, private cs: CountryService) { }

  ngOnInit(): void {
    this.regions = this.cs.regions;

    this.form.get('region')?.valueChanges
     .pipe(
       tap(() => this.form.get('country')?.reset('')),
       tap(() => this.countries = []),
       tap(() => this.loading = true),
       switchMap(region => this.cs.getCountriesByRegion(region)),
     )
     .subscribe(countries => {
       countries.length !== 0 ? this.form.get('country')?.enable(): this.form.get('country')?.disable();
       this.countries = countries;
       this.loading = false;
     });

    this.form.get('country')?.valueChanges
     .pipe(
       tap(() => this.form.get('border')?.reset('')),
       tap(() => this.borders = []),
       tap(() => this.loading = true),
       tap(() => this.alertMessage = false),
       switchMap(countryCode => {return countryCode!== '' ? this.cs.getCountryById(countryCode) : of(null)}),
       switchMap(country => this.cs.getCountriesSmallByIds(country?.borders)),
     )
     .subscribe(countries => {
       if (this.form.get('country')?.value !== '' && countries.length === 0) {
        this.alertMessage = true;
       }

       countries?.length !== 0 ? this.form.get('border')?.enable(): this.form.get('border')?.disable();
       this.borders = countries ? countries : [];
       this.loading = false;
     });

  }

  public onSave(): void {
    console.log(this.form.value);
  }

}
