exports.id=902,exports.ids=[902],exports.modules={149:(e,t,a)=>{"use strict";a.a(e,async(e,s)=>{try{a.d(t,{A:()=>m});var n=a(8732),r=a(5458),i=a(9486),o=a(6884),c=a(2794),l=a(4043),d=e([r,i,o,c,l]);function m({label:e,name:t,placeholder:a,defaultValue:s="",readonly:d=!1,rules:m,componentProps:u={isCurrency:!1}}){let{control:p}=(0,o.useFormContext)();return(0,n.jsx)(o.Controller,{name:t,control:p,defaultValue:s,rules:m||{},render:({field:t,fieldState:s})=>(0,n.jsxs)(i.eI,{className:"mr-1",children:[(0,n.jsx)(i.lR,{className:(0,l.cn)(u?.classNames?.labelStyles,s.error?"text-error-500":void 0),children:e}),(0,n.jsx)(i.MJ,{children:(0,n.jsx)(r.p,{...t,value:t.value??"",disabled:d,onChange:e=>{let a=e.target.value;u.isCurrency&&!Number.isNaN(parseInt(a))&&(a=a.replace(/,/g,""),a=c.k.currencyInputFormatter(a),t.onChange(a)),t.onChange(a)},placeholder:a})}),(0,n.jsx)(i.C5,{position:u?.classNames?.errorPosition,children:s.error?.message})]})})}[r,i,o,c,l]=d.then?(await d)():d,s()}catch(e){s(e)}})},7500:(e,t,a)=>{"use strict";a.a(e,async(e,s)=>{try{a.d(t,{$:()=>m});var n=a(8732),r=a(2015),i=a(9640),o=a(8938),c=a(4043),l=e([i,o,c]);[i,o,c]=l.then?(await l)():l;let d=(0,o.cva)("inline-flex items-center justify-center space-x-[.5rem] whitespace-nowrap rounded-md paragraph3Medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",{variants:{variant:{default:"bg-primary-500 text-white hover:bg-primary-500/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",destructive:"bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90",outline:"border border-primary-500 bg-white text-primary-500 hover:bg-neutral-50 hover:text-primary-500 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50",secondary:"bg-white text-neutral-700 font-normal justify-start border border-neutral-200 hover:border-primary-300 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80 focus:border-primary-300",ghost:"hover:bg-neutral-50 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",link:"text-neutral-700 underline-offset-4 hover:underline dark:text-slate-50"},size:{lg:"h-[50px] px-[20px] py-[14px] rounded-[8px]",default:"h-[43px] py-[12px] px-[18px] rounded-[8px] min-w-[9.5rem]",sm:"h-9 rounded-md px-3",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),m=r.forwardRef(({className:e,variant:t,size:a,asChild:s=!1,...r},o)=>{let l=s?i.Slot:"button";return(0,n.jsx)(l,{className:(0,c.cn)(d({variant:t,size:a,className:e})),ref:o,...r})});m.displayName="Button",s()}catch(e){s(e)}})},9486:(e,t,a)=>{"use strict";a.a(e,async(e,s)=>{try{a.d(t,{C5:()=>N,MJ:()=>b,eI:()=>h,lR:()=>g,lV:()=>u});var n=a(8732),r=a(2015),i=a(9640),o=a(6884),c=a(2139),l=a(4043),d=a(88),m=e([i,o,l,d]);[i,o,l,d]=m.then?(await m)():m;let u=o.FormProvider,p=r.createContext({}),f=()=>{let e=r.useContext(p),t=r.useContext(y),{getFieldState:a,formState:s}=(0,o.useFormContext)(),n=a(e.name,s);if(!e)throw Error("useFormField should be used within <FormField>");let{id:i}=t;return{id:i,name:e.name,formItemId:`${i}-form-item`,formDescriptionId:`${i}-form-item-description`,formMessageId:`${i}-form-item-message`,...n}},y=r.createContext({}),h=r.forwardRef(({className:e,...t},a)=>{let s=r.useId();return(0,n.jsx)(y.Provider,{value:{id:s},children:(0,n.jsx)("div",{ref:a,className:(0,l.cn)("space-y-2 relative",e),...t})})});h.displayName="FormItem";let g=r.forwardRef(({className:e,...t},a)=>{let{error:s,formItemId:r}=f();return(0,n.jsx)(d.J,{ref:a,className:(0,l.cn)("paragraph2Medium text-neutral-800 block",s&&"text-error-500 dark:text-error-500",e),htmlFor:r,...t})});g.displayName="FormLabel";let b=r.forwardRef(({...e},t)=>{let{error:a,formItemId:s,formDescriptionId:r,formMessageId:o}=f();return(0,n.jsx)(i.Slot,{ref:t,id:s,"aria-describedby":a?`${r} ${o}`:`${r}`,"aria-invalid":!!a,...e})});b.displayName="FormControl",r.forwardRef(({className:e,...t},a)=>{let{formDescriptionId:s}=f();return(0,n.jsx)("p",{ref:a,id:s,className:(0,l.cn)("text-sm text-neutral-500 dark:text-slate-400",e),...t})}).displayName="FormDescription";let N=r.forwardRef(({className:e,children:t,position:a="relative",...s},r)=>{let{error:i,formMessageId:o}=f(),d=i?String(i?.message):t;return d?(0,n.jsxs)("p",{ref:r,id:o,className:(0,l.cn)(`text-sm font-normal text-error-500 dark:text-red-900 flex items-center ${a+" pb-1.5"}`,e),...s,children:[(0,n.jsx)(c.A,{className:"w-4 h-4 mr-1 inline-block"}),d]}):null});N.displayName="FormMessage",s()}catch(e){s(e)}})},5458:(e,t,a)=>{"use strict";a.a(e,async(e,s)=>{try{a.d(t,{p:()=>c});var n=a(8732),r=a(2015),i=a(4043),o=e([i]);i=(o.then?(await o)():o)[0];let c=r.forwardRef(({className:e,...t},a)=>(0,n.jsx)("input",{className:(0,i.cn)("flex h-12 w-full rounded-lg border border-neutral-200 text-neutral-700 bg-white px-4 py-6 paragraph2Regular file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-neutral-300 placeholder:paragraph2Regular focus-visible:outline-none disabled:cursor-not-allowed hover:border-primary-300 transition-[border] ease-in-out focus-visible:border-primary-300 disabled:hover:border-neutral-100 disabled:border-neutral-100 disabled:bg-neutral-50/80 disabled:text-neutral-700/70",e),ref:a,...t}));c.displayName="Input",s()}catch(e){s(e)}})},88:(e,t,a)=>{"use strict";a.a(e,async(e,s)=>{try{a.d(t,{J:()=>m});var n=a(8732),r=a(2015),i=a(598),o=a(8938),c=a(4043),l=e([i,o,c]);[i,o,c]=l.then?(await l)():l;let d=(0,o.cva)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),m=r.forwardRef(({className:e,...t},a)=>(0,n.jsx)(i.Root,{ref:a,className:(0,c.cn)(d(),"text-base",e),...t}));m.displayName=i.Root.displayName,s()}catch(e){s(e)}})},4043:(e,t,a)=>{"use strict";a.a(e,async(e,s)=>{try{a.d(t,{cn:()=>o});var n=a(802),r=a(5979),i=e([n,r]);function o(...e){return(0,r.twMerge)((0,n.clsx)(e))}[n,r]=i.then?(await i)():i,s()}catch(e){s(e)}})},1287:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>c});var s=a(8732);a(2880);var n=a(7912),r=a.n(n),i=a(4843),o=a.n(i);function c({Component:e,pageProps:t}){if("undefined"!=typeof document){let e=document.querySelector("#favico");if(!e)return;let t=window.matchMedia("(prefers-color-scheme:dark)");e.href=t.matches?"/favicon-light.png":"/favicon-dark.png"}return(0,s.jsxs)("main",{className:o().className+" anti-aliased",children:[(0,s.jsxs)(r(),{children:[(0,s.jsx)("title",{children:"Secondstax-KYC"}),(0,s.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,s.jsx)("link",{rel:"shortcut icon",href:"/favicon-light.png",type:"image/x-icon",id:"favico"})]}),(0,s.jsx)(e,{...t})]})}},5583:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>r});var s=a(8732),n=a(883);function r(){return(0,s.jsxs)(n.Html,{lang:"en",children:[(0,s.jsx)(n.Head,{}),(0,s.jsxs)("body",{className:"antialiased",children:[(0,s.jsx)(n.Main,{}),(0,s.jsx)(n.NextScript,{})]})]})}},2794:(e,t,a)=>{"use strict";a.a(e,async(e,s)=>{try{a.d(t,{k:()=>o});var n=a(1428),r=a(3127),i=e([n,r]);[n,r]=i.then?(await i)():i;class o{static getCountryProperty(e,t,a){let s=t.find(t=>t.cty_name.toLowerCase()===e.toLowerCase());if(s)return s[a]}static transformIndividualSchemaToServerSchema(e){return{Personal:[[{clientType:e.clientType,clientStatus:e.clientStatus}],[{catInvestment:[...e.catInvestment],taxexempt:e.taxexempt}],[...e.applicant.map(e=>({firstName:e.firstName,middleName:e.middleName??"",lastName:e.lastName,title:"Other"===e.title.presets?e.title.other??"":e.title.presets??"",dateOfBirth:e.dateOfBirth,gender:e.gender,countryOfBirth:e.citizenship,countryOfResidence:e.countryOfResidence,residentialStatus:e.residence.status??"",residentPermitNumber:e.residence.details?.permitNumber??"",permitIssueDate:e.residence.details?.permitIssueDate??"",placeOfIssue:e.residence.details?.permitIssuePlace??"",permitExpiryDate:e.residence.details?.permitExpiry??"",mothersMaidenName:e.mothersMaidenName,maidenName:e.maidenName??"",tin:e.tin,stateOfOrigin:e.stateOfOrigin??"",localGovernment:e.localGovernment??"",religion:e.religion??""}))],[...e.applicant.map(e=>{let t=(0,r.parsePhoneNumber)(e.contacts.phoneNumber[0].value),a=(0,r.parsePhoneNumber)(e.contacts.emergencyContact.phoneNumber[0].value);return{emailAddress:e.contacts.email,residentialAddress:e.contacts.residentialAddress,city:e.contacts.city,postalAddress:e.contacts.postalAddress,postCode:e.contacts.postalCode??"",phoneNumber:{countryCode:t?.countryCallingCode??"",phoneNumber:t?.nationalNumber??"",country:t?.country},contactName:e.contacts.emergencyContact.contactName,relation:e.contacts.emergencyContact.relation,mobile:{countryCode:a?.countryCallingCode,phoneNumber:a?.nationalNumber,country:a?.country},digitalAddress:e.contacts.digitalAddress??"",nearestLandmark:e.contacts.nearestLandmark??""}})],[...e.applicant.map(e=>{let t=e.employment.statusDetails??"",a=t?(0,r.parsePhoneNumber)(t.phoneNumber[0].value):"";return{employmentStatus:e.employment.status,employerPhoneNumber:{countryCode:a?a.countryCallingCode:a,phoneNumber:a?a.nationalNumber:a,country:a?a.country:a},occupation:t?t.occupation:t,profession:t?t.profession:t,employerName:t?t.name:t,employerAddress:t?t.address:t,employerCity:t?t.city:t,employerPostalAddress:t?t.postalAddress:t,employerPostCode:t?t.postalCode:t,positionHeld:t?t.positionHeld:t,employerEmailAddress:t?t.email:t,natureOfBusiness:t?t.natureOfBusiness:t,countryOfEmployment:t?t.countryOfEmployment:t,employerDigitalAddress:t?t.digitalAddress:t,employerNearestLandmark:t?t.nearestLandmark:t,yearsOfTotalEmployment:t?t.yearsOfTotalEmployment:t,yearsOfCurrentEmployment:t?t.yearsOfCurrentEmployment:t,yearsOfPreviousEmployment:t?t.yearsOfPreviousEmployment:t}})],[...e.applicant.map(e=>({bankCountry:e.bank.locale.country,bankName:e.bank.locale.name,bankBranch:e.bank.locale.branch,accountName:e.bank.account.name,accountNumber:e.bank.account.number,bvn:e.bank.account.bvn??"",accountType:e.bank.account.type??"",dateOpened:e.bank.account.dateOpened,swiftCode:e.bank.account.swiftCode,routingNumber:e.bank.account.routingNumber}))],[...e.applicant.map(e=>({idType:e.proofOfIdentity.idType,idNumber:e.proofOfIdentity.idNumber,issueDate:e.proofOfIdentity.issueDate,idPlaceOfIssue:e.proofOfIdentity.placeOfIssue,idExpiryDate:e.proofOfIdentity.expiryDate}))],[...e.applicant.map(e=>({riskTolerance:e.riskProfile.tolerance,investmentObjective:e.riskProfile.investmentObjective,beneficialOwner:e.riskProfile.beneficialOwner,investmentHorizon:e.riskProfile.investmentHorizon,initialInvestmentAmount:e.riskProfile.initialInvestmentAmount??"","Top-ups":e.riskProfile.topUps?.timeline.presets==="Other"?e.riskProfile.topUps.timeline.other:e.riskProfile.topUps?.timeline.presets,expectedRegularTopUpAmount:e.riskProfile.topUps?.amount,Withdrawals:e.riskProfile.withdrawals?.timeline.presets==="Other"?e.riskProfile.withdrawals.timeline.other:e.riskProfile.withdrawals?.timeline.presets,expectedRegularWithdrawalAmount:e.riskProfile.withdrawals?.amount,significantPortionWithdrawal:e.riskProfile.significantWithdrawalTimetable,sourceOfFunds:[...e.riskProfile.sourceOfFunds],emergencyFunds:e.riskProfile.emergencyFunds,investmentKnowledge:e.riskProfile.investmentKnowledge,modeStatementDelivery:e.riskProfile.statements?.deliveryMode,statementFrequency:e.riskProfile.statements?.frequency,reaction:e.riskProfile.reaction,agreement:e.riskProfile.agreementOfTerms?.agreed.toString()}))]],NextOfKin:[[...e.nextOfKin.map(e=>({title:"Other"===e.title.presets?e.title.other:e.title.presets,firstName:e.firstName,middleName:e.middleName,lastName:e.lastName,dateOfBirth:e.dateOfBirth,relationshipWithAccountApplicant:e.relationshipToApplicant,maritalStatus:e.maritalStatus,gender:e.gender,countryOfBirth:e.countryOfBirth,countryOfResidence:e.countryOfResidence,countryOfCitizenship:e.citizenship,percentageAllocation:e.percentageAllocation??"",placeOfBirth:e.placeOfBirth??""}))],[...e.nextOfKin.map(e=>{let t=(0,r.parsePhoneNumber)(e.contacts.phoneNumber[0].value);return{phoneNumber:{countryCode:t?.countryCallingCode,phoneNumber:t?.nationalNumber,country:t?.country},residentialAddress:e.contacts?.residentialAddress,city:e.contacts?.city,emailAddress:e.contacts?.email??""}})],[...e.nextOfKin.map(e=>({idType:e.proofOfIdentity?.idType??"",idNumber:e.proofOfIdentity?.idNumber??"",idIssueDate:e.proofOfIdentity?.issueDate??"",idPlaceOfIssue:e.proofOfIdentity?.placeOfIssue??"",idExpiryDate:e.proofOfIdentity?.expiryDate??""}))]],Disclosures:[[...e.applicant.map(e=>({signature:{fileName:e.disclosures.signatureResource}}))],[...e.applicant.map(e=>({nameOfApplicant:`${e.firstName} ${e.middleName??""} ${e.lastName}`,nameOfDeclarant:e.disclosures.ratification.nameOfDeclarant,languageOfUnderstanding:e.disclosures.ratification.languageOfUnderstanding}))],[...e.applicant.map(e=>({isPep:e.disclosures.pepInfo.isPep,specify:"Yes"===e.disclosures.pepInfo.isPep?e.disclosures.pepInfo.pepDetails?.desc:"",countryOfPep:"Yes"===e.disclosures.pepInfo.isPep?e.disclosures.pepInfo.pepDetails?.country:""}))],[{...e.applicant.map(e=>{let t=e.disclosures.fatca.details?(0,r.parsePhoneNumber)(e.disclosures.fatca.details.phoneNumber[0].value):void 0;return{fatcaStatus:[...e.disclosures.fatca.status],firstName:e.disclosures.fatca.details?.firstName??"",middleName:e.disclosures.fatca.details?.middleName??"",lastName:e.disclosures.fatca.details?.lastName??"",foreignTelephoneNumber:{countryCode:(t&&t.countryCallingCode)??"",phoneNumber:(t&&t.nationalNumber)??"",country:(t&&t.nationalNumber)??""},ownership:e.disclosures.fatca.details?.ownership??"",foreignResidentialAddress:e.disclosures.fatca.details?.foreignResidentialAddress??"",foreignMailingAddress:e.disclosures.fatca.details?.foreignMailingAddress??"",tin:e.disclosures.fatca.details?.tin??""}})}],[{terms:e.agreements.kestrel.termsAndConditions.agreed.toString()}],[...e.applicant.map(e=>({signature:{fileName:e.disclosures.kestrel.nomineeAgreement.signatureResource}}))],[{afrinvestIndemnity:e.agreements.afrinvest.emailIndemnity.agreed.toString()}],[{declaration:e.agreements.declarations.agreed.toString()}],[{signatureMandate:e.signatureMandate??""}],[{privacyPolicy:e.agreements.afrinvest.privacyPolicy.agreed.toString()}]],DocumentChecklist:[...e.applicant.map(e=>[{applicantID:e.fileUploads.applicantID.fileName??"",passportPhotograph:e.fileUploads.passportPhotograph.fileName??"",taxRegistration:e.fileUploads.taxCertificate.fileName??"",BVNNumber:e.fileUploads.BVN.fileName??"",proofOfAddress:e.fileUploads.proofOfAddress.fileName??"",mapScreenshot:e.fileUploads.addressMap.fileName??"",proofOfForeignAddress:e.fileUploads.foreignAddress.fileName??"",residenceWorkPermit:e.fileUploads.residencePermit.fileName??"",bankStatement3Months:e.fileUploads.proofOfBank.fileName??"",kenyaKRAPINCertificate:e.fileUploads.KRAPin.fileName??""}])]}}static transformCorporateSchemaToServerSchema(e){let t=e=>{let t=e.map(e=>(0,r.parsePhoneNumber)(e.value)),a={};return t.forEach((e,t)=>{e&&Object.defineProperty(a,`tel${t+1}`,{value:{countryCode:e.countryCallingCode,phoneNumber:e.nationalNumber}})}),a};return{Business:[[{catBusiness:e.businessInfo.categoryOfBusiness}],[{catInvestment:e.businessInfo.categoryOfInvestment,taxexempt:e.businessInfo.taxExempt}],[{...t(e.businessInfo.details.phoneNumber),companyName:e.businessInfo.details.name,companyType:e.businessInfo.details.type,companySector:e.businessInfo.details.sectorIndustry,companyPlace:e.businessInfo.details.physicalAddress,companyPostal:e.businessInfo.details.postalAddress,companyZip:e.businessInfo.details.postCode,city:e.businessInfo.details.city,companyEmail:e.businessInfo.details.emailAddress,countryOfIncorporation:e.businessInfo.details.countryOfIncorporation,companyWebsite:e.businessInfo.details.emailAddress,digitalAddress:e.businessInfo.details.digitalAddress,monthlyincome:e.businessInfo.details.turnOver?.monthlyAmount??"",annualincome:e.businessInfo.details.turnOver?.annualAmount??""}],[{certificatenbr:e.businessInfo.incorporation.certficateNo,taxNumber:e.businessInfo.incorporation.tin??"",pinnbr:e.businessInfo.incorporation.KRAPin??"",dateOfBirth:e.businessInfo.incorporation.date??"",licenseNumber:e.businessInfo.incorporation.licenseNo??"",parentCompany:e.businessInfo.incorporation.parentCountryIncorporation??""}]],Contact:[[{title:"Other"===e.contacts.contactPerson.title.presets?e.contacts.contactPerson.title.other:e.contacts.contactPerson.title.presets,firstName:e.contacts.contactPerson.firstName,middleName:e.contacts.contactPerson.middleName,lastName:e.contacts.contactPerson.lastName,dateOfBirth:e.contacts.contactPerson.dateOfBirth,gender:e.contacts.contactPerson.gender,maritalStatus:e.contacts.contactPerson.maritalStatus,placeOfBirth:e.contacts.contactPerson.placeOfBirth,countryOfBirth:e.contacts.contactPerson.countryOfBirth,countryOfResidence:e.contacts.contactPerson.countryOfResidence,countryOfCitizenship:e.contacts.contactPerson.citizenship,residentialStatus:e.contacts.contactPerson.residence.status??"",residentPermitNumber:e.contacts.contactPerson.residence.details?.permitNumber??"",issueDate:e.contacts.contactPerson.residence.details?.permitIssueDate??"",placeIssued:e.contacts.contactPerson.residence.details?.permitIssuePlace??"",expiryDate:e.contacts.contactPerson.residence.details?.permitExpiry??"",profession:e.contacts.contactPerson.profession,occupation:e.contacts.contactPerson.occupation,job:e.contacts.contactPerson.jobTitle,mothersmaidenname:e.contacts.contactPerson.mothersMaidenName,professionalLicenseNumber:e.contacts.contactPerson.professionalLicenseNo??"",tinNumber:e.contacts.contactPerson.tin??"",signatoryContact:e.contacts.contactPerson.isSignatory}],[{mobile:{...t(e.contacts.emergencyContact.phoneNumber).tel1},...t(e.contacts.phoneNumber),residentialAddress:e.contacts.residentialAddress,city:e.contacts.city,postalAddress:e.contacts.postalAddress,emailAddress:e.contacts.email,ContactName:e.contacts.emergencyContact.contactName,relation:e.contacts.emergencyContact.relation,digitalAddress:e.contacts.digitalAddress,nearestLandmark:e.contacts.nearestLandmark}],[{idType:e.contacts.proofOfIdentity.idType,idNumber:e.contacts.proofOfIdentity.idNumber,issueDate:e.contacts.proofOfIdentity.issueDate,placeOfIssue:e.contacts.proofOfIdentity.placeOfIssue,expiryDate:e.contacts.proofOfIdentity.expiryDate}]],Signatories:[[...e.accountSignatories.signatories.map(e=>({ContactName:e.address.emergencyContact.contactName,city:e.address.city,countryOfBirth:e.countryOfBirth,countryOfCitizenship:e.citizenship,countryOfResidence:e.countryOfResidence,dateOfBirth:e.dateOfBirth,digitalAddress:e.address.digitalAddress??"",emailAddress:e.address.email,expiryDate:e.residence.details?.permitExpiry??"",firstName:e.firstName,gender:e.gender??"",issueDate:e.residence.details?.permitIssueDate??"",job:e.jobTitle,lastName:e.lastName,localGovernment:e.localGovernment??"",maidenName:e.maidenName??"",mandate:e.signatureMandate??"",maritalStatus:e.maritalStatus??"",mobile:{...t(e.address.emergencyContact.phoneNumber).tel1},mothersmaidenname:e.mothersMaidenName,nearestLandmark:e.address.nearestLandmark??"",occupation:e.occupation,placeIssued:e.residence.details?.permitIssuePlace??"",placeOfBirth:e.placeOfBirth,postalAddress:e.address.postalAddress,profession:e.profession,professionallisence:e.professionalLicenseNo??"",relation:e.address.emergencyContact.relation,religion:e.religion??"",residentPermitNumber:e.residence.details?.permitNumber??"",residentialAddress:e.address.residentialAddress,residentialStatus:e.residence.status??"",signature:e.signatureResource,state:e.stateOfOrigin,status:[...e.role],title:e.title,tinNumber:e.tin,...t(e.address.phoneNumber)}))],[...e.accountSignatories.signatories.map(e=>({expiryDate:e.proofOfIdentity.expiryDate,idNumber:e.proofOfIdentity.idNumber,idType:e.proofOfIdentity.idType,issueDate:e.proofOfIdentity.issueDate,placeOfIssue:e.proofOfIdentity.placeOfIssue}))],[...e.accountSignatories.signatories.map(e=>({countryOfPep:e.pepInfo.pepDetails?.country??"",pep:e.pepInfo.isPep,specify:e.pepInfo.pepDetails?.desc??""}))],[...e.accountSignatories.directors.map(e=>({countryOfPep:e.pepInfo?.pepDetails?.country??"",dateOfBirth:"",firatName:e.firstName,homeAddress:"",idNumber:e.idNumber,idType:e.idType,lastName:e.lastName,middleName:e.middleName??"",ownership:e.ownership,pep:e.pepInfo?.isPep??"No",specify:e.pepInfo?.pepDetails?.desc??"",status:e.status??"",...t(e.phoneNumber)}))],[...e.accountSignatories.beneficialOwners.map(e=>({countryOfPep:e.pepInfo?.pepDetails?.country??"",dateOfBirth:"",firatName:e.firstName,homeAddress:"",idNumber:e.idNumber,idType:e.idType,lastName:e.lastName,middleName:e.middleName??"",ownership:e.ownership,pep:e.pepInfo?.isPep??"No",specify:e.pepInfo?.pepDetails?.desc??"",...t(e.phoneNumber)}))],[...e.accountSignatories.affiliations.map(e=>e.value)]],Bank:[[{accountName:e.settlementAccount.bank.account.name,accountNumber:e.settlementAccount.bank.account.number,accountType:e.settlementAccount.bank.account.type,bankBranch:e.settlementAccount.bank.locale.branch,bankCountry:e.settlementAccount.bank.locale.country,bankName:e.settlementAccount.bank.locale.name,bvn:e.settlementAccount.bank.account.bvn??"",routingNumber:e.settlementAccount.bank.account.routingNumber??"",swiftCode:e.settlementAccount.bank.account.swiftCode??""}],[{Topups:"Other"===e.settlementAccount.investmentActivity.topUps.timeline.presets?e.settlementAccount.investmentActivity.topUps.timeline.other:e.settlementAccount.investmentActivity.topUps.timeline.presets??"",Withdrawals:"Other"===e.settlementAccount.investmentActivity.withdrawals.timeline.presets?e.settlementAccount.investmentActivity.withdrawals.timeline.other:e.settlementAccount.investmentActivity.withdrawals.timeline.presets??"",expectedAmount:e.settlementAccount.investmentActivity.withdrawalAmounts,funds:[...e.settlementAccount.investmentActivity.sourceOfFunds],initialAmount:e.settlementAccount.investmentActivity.initialAmount,investmentFrequency:e.settlementAccount.investmentActivity.frequency,reguralAmount:e.settlementAccount.investmentActivity.topUpAmounts}],[{agrement:e.settlementAccount.riskProfile.riskAgreement?"I/We understand investing in equities/shares is inherently risker than investing in fixed income products or holding cash":"",horizon:e.settlementAccount.riskProfile.investmentHorizon,investmentKnowledge:e.settlementAccount.riskProfile.investmentKnowledge,reaction:e.settlementAccount.riskProfile.reaction,risktrelance:e.settlementAccount.riskProfile.tolerance}],[{investmentObjective:e.settlementAccount.investmentActivity.objective,modeStatementDelivery:e.settlementAccount.statements.modeOfDelivery,statementFrequency:e.settlementAccount.statements.frequency}]],Disclosures:[[{terms:e.disclosures.kestrel.termsAndConditions.agreed?"I/We agree to the above Terms and Conditions":""}],[e.accountSignatories.signatories.map(e=>({signature:e.disclosures.kestrel.nomineeAgreement.signatureResource}))],[e.accountSignatories.signatories.map(e=>({signature:e.disclosures.databank.emailIndemnity.signatureResource,YourHouseAddress:`${e.address.residentialAddress}, ${e.address.city} ${e.countryOfResidence}`}))],[{afrinvestIndemnity:e.disclosures.afrinvest.emailIndemnity.agreed?"I/We agree to the above indemnity provisions.":""}],[{signatureMandate:e.disclosures.signatureMandate}],[{declaration:e.disclosures.declarations.agreed?"I/We agree to the above declarations":""}],[...e.accountSignatories.signatories.map(e=>({factcastatus:[...e.disclosures.fatca.status],ownership:e.disclosures.fatca.ownership}))]],DocumentChecklist:[[...e.accountSignatories.signatories.map(e=>({residentFile:e.documentChecklist.residencePermit.fileName,signatoriesIDFile:e.documentChecklist.signatoryID.fileName,signatoriesPhotosFile:e.documentChecklist.signatoryPhotographs.fileName})),{BVNNumber:e.generalDocumentChecklist.BVN.fileName??"",OriginalDirectorsIDsFile:e.generalDocumentChecklist.directorsID.fileName??"",W9W8BENEFile:e.generalDocumentChecklist.W9_W8BEN_E.fileName??"",authorizedPersonsPhotoFile:e.generalDocumentChecklist.directors_authorizedPerson.fileName??"",bankFile:e.generalDocumentChecklist.bankProof.fileName??"",beneficiariesIDFile:e.generalDocumentChecklist.beneficiariesID.fileName??"",foreignAddressFile:e.generalDocumentChecklist.proofForeignAddress.fileName??"",incorporationFile:e.generalDocumentChecklist.incorporationCertificate.fileName??"",kenyaKraPinCertificate:e.generalDocumentChecklist.KRAPin.fileName??"",officialRegistryFile:e.generalDocumentChecklist.registrySearch.fileName??"",proofOfAddressFile:e.generalDocumentChecklist.proofOfAddress.fileName??"",sealFile:e.generalDocumentChecklist.companySeal.fileName??"",resolutionFile:e.generalDocumentChecklist.boardResolution.fileName??"",taxRegistrationCertificateFile:e.generalDocumentChecklist.taxCertificate.fileName??"",uboFile:e.generalDocumentChecklist.UBO.fileName??""}]]}}static recursiveObjectSearch(e,t){if(""===e)return t;let a=e.split(".");if("object"!=typeof t||!t)return t;let s=Object.hasOwn(t,a[0])?t[a[0]]:void 0;return a.shift(),this.recursiveObjectSearch(a.join("."),s)}static async statelessRequest(e,t={method:"GET",withCredentials:!0}){try{let a=await (0,n.default)(e,{...t});if(200===a.status)return a.data;throw Error("Status: "+a.status+", Message: "+a.statusText)}catch(e){throw e}}static currencyInputFormatter(e){return new Intl.NumberFormat("en-GB",{useGrouping:"always"}).format(parseInt(e))}static generateUniqueIdentifier(){return Math.random().toString(36).substr(2,7)}static helper(e,t,a){let[s,...n]=t;if(n.length>0){if(!e[s]){let t=`${+n[0]}`===n[0];e[s]=t?[]:{}}if("object"!=typeof e[s]){let t=`${+n[0]}`===n[0];e[s]=this.helper(t?[]:{},n,a)}else e[s]=this.helper(e[s],n,a)}else e[s]=a;return e}static set(e,t,a){let s=[];"string"==typeof t&&(s=t.split(".")),this.helper(e,s,a)}}s()}catch(e){s(e)}})},2880:()=>{}};