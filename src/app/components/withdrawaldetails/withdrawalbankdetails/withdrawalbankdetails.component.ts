import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShareDataService } from 'src/app/services/share-data.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { TokenService } from 'src/app/services/token.service';
import { WithdrawalDetailsService } from 'src/app/services/withdrawaldetails.service';

@Component({
  selector: 'app-withdrawalbankdetails',
  templateUrl: './withdrawalbankdetails.component.html',
  styleUrls: ['./withdrawalbankdetails.component.scss']
})
export class WithdrawalbankdetailsComponent implements OnInit {
  loader: boolean = false;
  currentUser:any;
  noBank:boolean=true;
  showBankList:boolean=false;
  bankList:any=[];
  Banks:any= [
    "Abhyudaya Co-Operative Bank Ltd",
    "Allahabad Bank",
    "Andhra Bank",
    "AU Small Finance Bank",
    "Axis Bank",
    "Bandhan Bank",
    "Bank of Bahrain and Kuwait",
    "Bank of Baroda",
    "Bank of India",
    "Bank of Maharashtra",
    "Canara Bank",
    "Catholic Syrian Bank",
    "Central Bank of India",
    "CitiBank",
    "City Union Bank",
    "Corpation Bank",
    "DBS Bank",
    "Dhanlaxmi Bank",
    "Equitas Small Finance Bank",
    "Federal Bank",
    "GP Parsik Bank",
    "HDFC Bank",
    "ICICI Bank",
    "IDBI Bank",
    "IDFC FIRST Bank",
    "Indiabulls",
    "indian Bank",
    "Indian Overseas Bank",
    "Induslnd Bank",
    "ING Vysya Bank",
    "Jammu and Kashmir Bank",
    "Karnataka Bank Ltd",
    "Karur Vysya Bank",
    "Kotak Mahindra Bank",
    "Lakshmi Vilas Bank",
    "Nainital Bank",
    "Oriental Bank of Commerce",
    "Paytm Payments Bank",
    "Punjab & Sind Bank",
    "Punjab National Bank",
    "RBL Bank",
    "Shamrao Vitthal Co-Operative Bank",
    "Shivalik small Finance Bank",
    "South Indian Bank",
    "Standard Chartered",
    "State Bank of Bikaner & Jaipur",
    "State Bank of Hyderabad",
    "State Bank of India",
    "State Bank of Mysore",
    "State Bank of Patiala",
    "State Bank of Travancore",
    "Syndicate Bank",
    "Tamilnad Mercantile Bank Ltd.",
    "UCO Bank",
    "Ujjivan Small Finance Bank",
    "Union Bank of India",
    "United Bank of India",
    "Vijaya Bank",
    "Yes Bank"
  ];
  BankForm:FormGroup;
  editBankForm:FormGroup;
  addBankInTransit:boolean=false;
  updateBankInTransit:boolean=false;
  preferredBankInTransit:boolean=false;
  deleteBankInTransit:boolean=false;
  Provider:any=['GPay','PhonePe','Paytm']
  selectedBankName:string='';
  selectedProvider:string='';
  selectedBankupi:any;
  from:any='';
  Update: any;
  constructor(
    private withdrawService:WithdrawalDetailsService,
    private tokenService:TokenService,
    private fb:FormBuilder,
    public toastr: ToastMessageService,
    private shareService: ShareDataService
    ) { }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUserInfo();
    this.initForm();
    this.getBankAccountList(this.currentUser.userId);
    this.getlanguages();
  }
  getlanguages() {
    this.shareService._lagugageSub$.subscribe(data => {
      if(data != null){
        this.Update = data
        }
      if(this.Update?.myaccount=="আমার অ্যাকাউন্ট"){
        $("#accountPopup").css('font-size', '9px');
      }else{
        $("#accountPopup").css('font-size', 'inherit');
      }

    })
  }

  initForm(){
    this.BankForm = this.fb.group({
      account_holder:['',Validators.required],
      account_number:['',Validators.required],
      bank_name:['',Validators.required],
      ifsc_code:['', [Validators.required,Validators.pattern("^[A-Z]{4}0[A-Z0-9]{6}$")]],
      uid:[this.currentUser.userId]
    })
    this.editBankForm = this.fb.group({
      bank_id:['',Validators.required],
      account_holder:['',Validators.required],
      account_number:['',Validators.required],
      bank_name:['',Validators.required],
      ifsc_code:['', [Validators.required,Validators.pattern("^[A-Z]{4}0[A-Z0-9]{6}$")]],
    })
  }

  showOverlayInfo(value) {
    $(value).css('display', 'flex');
  }

  showconfirmation(value,from,bankupi){
    this.from = from;
    this.selectedBankupi = bankupi;
    $(value).css('display', 'flex');
  }

  showBanks(){
    this.showBankList = !this.showBankList;
  }


  showEditBank(value,bankupi){
    this.selectedBankupi = bankupi;
    this.editBankForm.setValue({
      bank_id:this.selectedBankupi.bank_id,
      account_holder:this.selectedBankupi.account_holder,
      account_number:this.selectedBankupi.account_number,
      bank_name:this.selectedBankupi.bank_name,
      ifsc_code:this.selectedBankupi.ifsc_code
    });
    $(value).css('display', 'flex');
  }



  hideOverlayInfo(value) {
    this.selectedBankupi = '';
    $(value).fadeOut();
  }

  selectBank(bankName:string){
    this.selectedBankName = bankName;
  }

  selectProvider(providerName:string){
    this.selectedProvider = providerName;
  }

  getBankAccountList(uid:any){
    this.withdrawService.getBankAccountsList(uid).subscribe((resp: any) => {
      if (resp.status === 'Success') {
        this.noBank = false;
        if(resp.data){
          this.bankList = resp.data;
        }
        $('#page_loading').css('display', 'none');
      } else {
        this.noBank = true;
        $('#page_loading').css('display', 'none');
      }
    }, err => {
      console.log(err);
    }
    );
  }

  addBank(){
    if(this.addBankInTransit){
      return;
    }
    if(this.BankForm.valid){
      this.addBankInTransit = true;
      $('#page_loading').css('display', 'flex');
      this.withdrawService.addBank(this.BankForm.value).subscribe((resp: any) => {
        if(resp){
          this.addBankInTransit = false;
          if (resp.status === 'Success') {
            this.toastr.successMsg(resp.message)
            $('#page_loading').css('display', 'none');
            this.hideOverlayInfo('#addBankDialog');
            this.BankFormReset();
            this.getBankAccountList(this.currentUser.userId);
          } else {
            this.toastr.errorMsg(resp.message)
            $('#page_loading').css('display', 'none');
          }
        }
      }, err => {
        this.addBankInTransit = false;
        console.log(err);
      }
      );
    }
    else{
      this.toastr.errorMsg('Invalid Input')
    }

  }

  setPreferredBank(){
    $('#page_loading').css('display', 'flex');
    if(this.preferredBankInTransit){
      return
    }
    this.preferredBankInTransit = true;
    let data = {
      "uid":this.currentUser.userId,
      "bank_id":this.selectedBankupi.bank_id,
      "isPreferred":1
    }
    this.withdrawService.setPrefferedBank(data).subscribe((resp: any) => {
      if(resp){
        this.preferredBankInTransit = false;
        if (resp.status === 'Success') {
          this.toastr.successMsg(resp.message)
          $('#page_loading').css('display', 'none');
          this.hideOverlayInfo('#confirmation');
          this.getBankAccountList(this.currentUser.userId);
        } else {
          this.toastr.errorMsg(resp.message)
          $('#page_loading').css('display', 'none');
        }
      }
    }, err => {
      this.preferredBankInTransit = false;
      console.log(err);
    }
    );
  }


  deleteBank(){
    $('#page_loading').css('display', 'flex');
    if(this.deleteBankInTransit){
      return
    }
    this.deleteBankInTransit = true;
    this.withdrawService.deleteBank(this.selectedBankupi.bank_id).subscribe((resp: any) => {
      if(resp){
        this.deleteBankInTransit = false;
        this.hideOverlayInfo('#confirmation');
        if (resp.status === 'Success') {
          this.toastr.successMsg(resp.message)
          $('#page_loading').css('display', 'none');
          this.getBankAccountList(this.currentUser.userId);
        } else {
          this.toastr.errorMsg(resp.message)
          $('#page_loading').css('display', 'none');
        }
      }
    }, err => {
      this.hideOverlayInfo('#confirmation');
      this.deleteBankInTransit = false;
      console.log(err);
    }
    );
  }


  updateBank(){
    if(this.updateBankInTransit){
      return;
    }
    if(this.editBankForm.valid){
      this.updateBankInTransit = true;
      $('#page_loading').css('display', 'flex');
      this.withdrawService.updateBank(this.editBankForm.value).subscribe((resp: any) => {
        if(resp){
          this.updateBankInTransit = false;
          if (resp.status === 'Success') {
            this.toastr.successMsg(resp.message)
            $('#page_loading').css('display', 'none');
            this.hideOverlayInfo('#editBankDialog');
            this.editBankForm.reset();
            this.getBankAccountList(this.currentUser.userId);
          } else {
            this.toastr.errorMsg(resp.message)
            $('#page_loading').css('display', 'none');
          }
        }
      }, err => {
        this.updateBankInTransit = false;
        console.log(err);
      }
      );
    }
    else{
      this.toastr.errorMsg('Invalid Input')
    }

  }



  BankFormReset(){
    this.BankForm.controls.account_holder.reset();
    this.BankForm.controls.account_number.reset();
    this.BankForm.controls.bank_name.reset();
    this.BankForm.controls.ifsc_code.reset();
  }


}
