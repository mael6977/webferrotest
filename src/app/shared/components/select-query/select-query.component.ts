import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { GenericRequest, GenericResponse } from '../../../core/interface/generic.interface';
import { BusinessInfoService } from '../../../core/services/business-info.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import * as BusinessActions from '../../../store/actions/business.actions';

@Component({
  selector: 'app-select-query',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatIconModule],
  providers: [BusinessInfoService],
  templateUrl: './select-query.component.html',
  styleUrls: ['./select-query.component.scss']
})

export class SelectQueryComponent {
  @Input() public dataRequest!: GenericRequest;
  @Output() public optionsSelected: EventEmitter<GenericResponse> = new EventEmitter<GenericResponse>();

  public provinces: string[] = [];
  public localities: string[] = [];
  public establishments: string[] = [];
  public addresses: string[] = [];

  public selectedProvince: string = "";
  public selectedLocality: string = "";
  public selectedEstablishment: string = "";
  public selectedAddress: string = "";

  constructor(private businessInfoService: BusinessInfoService, private store: Store<AppState>) { }

  ngOnInit() {
    this.loadProvinces();
  }

  loadProvinces(): void {
    this.businessInfoService.getProvinces().subscribe(data => {
      this.provinces = data.map((item: any) => item._id);
    });
  }

  loadLocalities(province: string): void {
    this.businessInfoService.getLocalities(province).subscribe(data => {
      this.localities = data.map((item: any) => item._id);
      this.establishments = [];
      this.addresses = [];
      this.selectedLocality = '';
      this.selectedEstablishment = '';
      this.selectedAddress = '';
    });
  }

  loadEstablishments(province: string, locality: string): void {
    this.businessInfoService.getEstablishments(province, locality).subscribe(data => {
      this.establishments = data.map((item: any) => item._id);
      this.addresses = [];
      this.selectedEstablishment = '';
      this.selectedAddress = '';
    });
  }

  loadAddresses(province: string, locality: string, establishment: string): void {
    this.businessInfoService.getAddresses(province, locality, establishment).subscribe(data => {
      this.addresses = data.map((item: any) => item._id);
      this.selectedAddress = '';
    });
  }

  onProvinceChange(event: Event): void {
    const province = (event.target as HTMLSelectElement).value;
    this.selectedProvince = province;
    this.loadLocalities(province);
  }

  onLocalityChange(event: Event): void {
    const locality = (event.target as HTMLSelectElement).value;
    this.selectedLocality = locality;
    this.loadEstablishments(this.selectedProvince, locality);
  }

  onEstablishmentChange(event: Event): void {
    const establishment = (event.target as HTMLSelectElement).value;
    this.selectedEstablishment = establishment;
    this.loadAddresses(this.selectedProvince, this.selectedLocality, establishment);
  }

  onAddressChange(event: Event): void {
    const address = (event.target as HTMLSelectElement).value;
    this.selectedAddress = address;
    this.getFinalResult();
  }

  getFinalResult(): void {
    this.businessInfoService.getResults(this.selectedProvince, this.selectedLocality, this.selectedEstablishment, this.selectedAddress)
      .subscribe(data => {
        const infoOption: GenericResponse = {
          selectStep: this.dataRequest.nextStep1,
          prevStep: this.dataRequest.prevStep
        };

        this.store.dispatch(BusinessActions.setSelectedBusiness({
          id: data._id,
          province: data.province,
          locality: data.locality,
          distributor: data.distributor,
          address: data.address,
          establishment: data.establishment,
          audits: data.audits
        }))
        this.optionsSelected.emit(infoOption);
      });
  }
}
