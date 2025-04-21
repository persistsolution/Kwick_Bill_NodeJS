import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../../config/sequelize";

// Define UserBill attributes
export interface UserBillAttributes {
    id: number;
    CustomerId?: string | null;
    ColgId?: number | null;
    ShopName?: string | null;
    Fname?: string | null;
    Mname?: string | null;
    Lname?: string | null;
    Phone?: string | null;
    Phone2?: string | null;
    EmailId?: string | null;
    Password?: string | null;
    CountryId: number;
    StateId: number;
    CityId: number;
    AreaId?: number | null;
    Address?: string | null;
    Pincode?: string | null;
    Photo?: string | null;
    Photo2?: string | null;
    Photo3?: string | null;
    GstNo?: string | null;
    PanNo?: string | null;
    Roll: number;
    Status: number;
    CreatedBy: number;
    ModifiedBy: number;
    CreatedDate: Date;
    ModifiedDate?: Date | null;
    Options?: string | null;
    BranchId?: string | null;
    Dob?: Date | null;
    Area?: string | null;
    UserType: number;
    PayMode?: string | null;
    UnderUser: number;
    ProjectType?: string | null;
    BeneficiaryId?: string | null;
    Taluka?: string | null;
    Village?: string | null;
    District?: string | null;
    PumpCapacity?: string | null;
    RooftopPlantCapacity?: string | null;
    Lattitude?: string | null;
    Longitude?: string | null;
    OffOnGrid?: string | null;
    SanctionLoad?: string | null;
    LoadExtension?: string | null;
    WaterSource?: string | null;
    SummerDepth?: string | null;
    WinterDepth?: string | null;
    PumpHead?: string | null;
    BgNumber?: string | null;
    BgValidity?: string | null;
    BgClaimPeriod?: string | null;
    InsuranceNumber?: string | null;
    InsuranceAgency?: string | null;
    InsuranceValidity?: string | null;
    InstallationVendor?: string | null;
    SurveyDetails: number;
    SchemeId: number;
    PumpHeadSelect?: string | null;
    AcDc?: string | null;
    Surface?: string | null;
    AadharNo?: string | null;
    AadharCard?: string | null;
    AadharCard2?: string | null;
    PanCard?: string | null;
    PanCard2?: string | null;
    GstCertificate?: string | null;
    AccountName?: string | null;
    BankName?: string | null;
    AccountNo?: string | null;
    IfscCode?: string | null;
    Branch?: string | null;
    UpiNo?: string | null;
    GumastaNo?: string | null;
    Gumasta?: string | null;
    MsmeNo?: string | null;
    Msme?: string | null;
    InspectionDate?: Date | null;
    CommissioningDate?: Date | null;
    CustType: number;
    BoreDia: string;
    Details?: string | null;
    CatId: string;
    CompName?: string | null;
    CompAddress?: string | null;
    CompPhone?: string | null;
    AuthorName?: string | null;
    Tokens?: string | null;
    CompId: number;
    FatherPhone?: string | null;
    Designation?: string | null;
    BloodGroup?: string | null;
    JoinDate?: Date | null;
    EmailId2?: string | null;
    PerDaySalary?: number | null;
    Barcode?: string | null;
    KycStatus: number;
    KycDate?: Date | null;
    Profession?: string | null;
    FsiicNo?: string | null;
    ShopActNo?: string | null;
    AnniversaryDate?: Date | null;
    ExeId: number;
    SellAmt?: number | null;
    SellDate?: Date | null;
    UnderFr: number;
    ReportingMgr: number;
    ResignStatus: number;
    ResignDate?: Date | null;
    ResignComment?: string | null;
    BillSoftFrId: number;
    PkgId: number;
    PkgAmt?: number | null;
    PkgDiscount?: number | null;
    PkgDate?: Date | null;
    PkgValidity?: Date | null;
    Prime: number;
    terms_condition?: string | null;
    bottom_title?: string | null;
    ReferCode?: string | null;
    OwnFranchise: number;
    PrintCompName?: string | null;
    PrintMobNo?: string | null;
    TableQrCode?: string | null;
    FoodLicence?: string | null;
    FoodLicenceReceipt?: string | null;
    AgreementCopy?: string | null;
    SalaryType: number;
    CreditSalaryStatus: number;
    IdStatus: number;
    zone?: string | null;
    CocoFranchiseAccess?: string | null;
    CinNo?: string | null;
    push_flag: number;
    delete_flag: number;
    modified_time: Date;
    UnderFrId: number;
    Location?: string | null;
    ShowFrStatus: number;
    ReferalNo1?: string | null;
    ReferalNo2?: string | null;
    NomineePartnerName?: string | null;
    NomineePartnerRelation?: string | null;
    NomineePartnerPhone?: string | null;
    BillAmount?: number | null;
    ExpCatId?: string | null;
    MainBrEmp: number;
    ExpApproval: number;
    UnderByUser: number;
    DeliveryPerson: number;
    ChequeBook?: string | null;
    TradeName?: string | null;
    TypeOfVendor: number;
    RefPhone?: string | null;
    RefPhone2?: string | null;
    RefEmailId?: string | null;
    AllocateProd?: string | null;
    AllocateRawProd?: string | null;
    Percentage?: string | null;
    AuthToken?: string | null;
    DeclarationPdf?: string | null;
    NomineeName?: string | null;
    NomineeRelation?: string | null;
    NomineePhone?: number | null;
    NomineeAadharNo?: string | null;
    ZoneId: number;
    MonthlySalary?: string | null;
    DeclarationPhoto?: string | null;
    MgrCheckpoint: number;
    OtherEmp: number;
}

// Define optional fields for creation
export interface UserBillCreationAttributes extends Optional<UserBillAttributes, 'id'> {}

// Define the UserBill model
class UserBill extends Model<UserBillAttributes, UserBillCreationAttributes> implements UserBillAttributes {
    public id!: number;
    public CustomerId?: string | null;
    public ColgId?: number | null;
    public ShopName?: string | null;
    public Fname?: string | null;
    public Mname?: string | null;
    public Lname?: string | null;
    public Phone?: string | null;
    public Phone2?: string | null;
    public EmailId?: string | null;
    public Password?: string | null;
    public CountryId!: number;
    public StateId!: number;
    public CityId!: number;
    public AreaId?: number | null;
    public Address?: string | null;
    public Pincode?: string | null;
    public Photo?: string | null;
    public Photo2?: string | null;
    public Photo3?: string | null;
    public GstNo?: string | null;
    public PanNo?: string | null;
    public Roll!: number;
    public Status!: number;
    public CreatedBy!: number;
    public ModifiedBy!: number;
    public CreatedDate!: Date;
    public ModifiedDate?: Date | null;
    public Options?: string | null;
    public BranchId?: string | null;
    public Dob?: Date | null;
    public Area?: string | null;
    public UserType!: number;
    public PayMode?: string | null;
    public UnderUser!: number;
    public ProjectType?: string | null;
    public BeneficiaryId?: string | null;
    public Taluka?: string | null;
    public Village?: string | null;
    public District?: string | null;
    public PumpCapacity?: string | null;
    public RooftopPlantCapacity?: string | null;
    public Lattitude?: string | null;
    public Longitude?: string | null;
    public OffOnGrid?: string | null;
    public SanctionLoad?: string | null;
    public LoadExtension?: string | null;
    public WaterSource?: string | null;
    public SummerDepth?: string | null;
    public WinterDepth?: string | null;
    public PumpHead?: string | null;
    public BgNumber?: string | null;
    public BgValidity?: string | null;
    public BgClaimPeriod?: string | null;
    public InsuranceNumber?: string | null;
    public InsuranceAgency?: string | null;
    public InsuranceValidity?: string | null;
    public InstallationVendor?: string | null;
    public SurveyDetails!: number;
    public SchemeId!: number;
    public PumpHeadSelect?: string | null;
    public AcDc?: string | null;
    public Surface?: string | null;
    public AadharNo?: string | null;
    public AadharCard?: string | null;
    public AadharCard2?: string | null;
    public PanCard?: string | null;
    public PanCard2?: string | null;
    public GstCertificate?: string | null;
    public AccountName?: string | null;
    public BankName?: string | null;
    public AccountNo?: string | null;
    public IfscCode?: string | null;
    public Branch?: string | null;
    public UpiNo?: string | null;
    public GumastaNo?: string | null;
    public Gumasta?: string | null;
    public MsmeNo?: string | null;
    public Msme?: string | null;
    public InspectionDate?: Date | null;
    public CommissioningDate?: Date | null;
    public CustType!: number;
    public BoreDia!: string;
    public Details?: string | null;
    public CatId!: string;
    public CompName?: string | null;
    public CompAddress?: string | null;
    public CompPhone?: string | null;
    public AuthorName?: string | null;
    public Tokens?: string | null;
    public CompId!: number;
    public FatherPhone?: string | null;
    public Designation?: string | null;
    public BloodGroup?: string | null;
    public JoinDate?: Date | null;
    public EmailId2?: string | null;
    public PerDaySalary?: number | null;
    public Barcode?: string | null;
    public KycStatus!: number;
    public KycDate?: Date | null;
    public Profession?: string | null;
    public FsiicNo?: string | null;
    public ShopActNo?: string | null;
    public AnniversaryDate?: Date | null;
    public ExeId!: number;
    public SellAmt?: number | null;
    public SellDate?: Date | null;
    public UnderFr!: number;
    public ReportingMgr!: number;
    public ResignStatus!: number;
    public ResignDate?: Date | null;
    public ResignComment?: string | null;
    public BillSoftFrId!: number;
    public PkgId!: number;
    public PkgAmt?: number | null;
    public PkgDiscount?: number | null;
    public PkgDate?: Date | null;
    public PkgValidity?: Date | null;
    public Prime!: number;
    public terms_condition?: string | null;
    public bottom_title?: string | null;
    public ReferCode?: string | null;
    public OwnFranchise!: number;
    public PrintCompName?: string | null;
    public PrintMobNo?: string | null;
    public TableQrCode?: string | null;
    public FoodLicence?: string | null;
    public FoodLicenceReceipt?: string | null;
    public AgreementCopy?: string | null;
    public SalaryType!: number;
    public CreditSalaryStatus!: number;
    public IdStatus!: number;
    public zone?: string | null;
    public CocoFranchiseAccess?: string | null;
    public CinNo?: string | null;
    public push_flag!: number;
    public delete_flag!: number;
    public modified_time!: Date;
    public UnderFrId!: number;
    public Location?: string | null;
    public ShowFrStatus!: number;
    public ReferalNo1?: string | null;
    public ReferalNo2?: string | null;
    public NomineePartnerName?: string | null;
    public NomineePartnerRelation?: string | null;
    public NomineePartnerPhone?: string | null;
    public BillAmount?: number | null;
    public ExpCatId?: string | null;
    public MainBrEmp!: number;
    public ExpApproval!: number;
    public UnderByUser!: number;
    public DeliveryPerson!: number;
    public ChequeBook?: string | null;
    public TradeName?: string | null;
    public TypeOfVendor!: number;
    public RefPhone?: string | null;
    public RefPhone2?: string | null;
    public RefEmailId?: string | null;
    public AllocateProd?: string | null;
    public AllocateRawProd?: string | null;
    public Percentage?: string | null;
    public AuthToken?: string | null;
    public DeclarationPdf?: string | null;
    public NomineeName?: string | null;
    public NomineeRelation?: string | null;
    public NomineePhone?: number | null;
    public NomineeAadharNo?: string | null;
    public ZoneId!: number;
    public MonthlySalary?: string | null;
    public DeclarationPhoto?: string | null;
    public MgrCheckpoint!: number;
    public OtherEmp!: number; 
}

// Initialize the model
UserBill.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
    CustomerId: { type: DataTypes.STRING, allowNull: true },
    ColgId: { type: DataTypes.INTEGER, allowNull: true },
    ShopName: { type: DataTypes.STRING, allowNull: true },
    Fname: { type: DataTypes.STRING, allowNull: true },
    Mname: { type: DataTypes.STRING, allowNull: true },
    Lname: { type: DataTypes.STRING, allowNull: true },
    Phone: { type: DataTypes.STRING, allowNull: true },
    Phone2: { type: DataTypes.STRING, allowNull: true },
    EmailId: { type: DataTypes.STRING, allowNull: true },
    Password: { type: DataTypes.STRING, allowNull: true },
    CountryId: { type: DataTypes.INTEGER, allowNull: true },
    StateId: { type: DataTypes.INTEGER, allowNull: true },
    CityId: { type: DataTypes.INTEGER, allowNull: true },
    AreaId: { type: DataTypes.INTEGER, allowNull: true },
    Address: { type: DataTypes.STRING, allowNull: true },
    Pincode: { type: DataTypes.STRING, allowNull: true },
    Photo: { type: DataTypes.STRING, allowNull: true },
    Photo2: { type: DataTypes.STRING, allowNull: true },
    Photo3: { type: DataTypes.STRING, allowNull: true },
    GstNo: { type: DataTypes.STRING, allowNull: true },
    PanNo: { type: DataTypes.STRING, allowNull: true },
    Roll: { type: DataTypes.INTEGER, allowNull: true },
    Status: { type: DataTypes.INTEGER, allowNull: true },
    CreatedBy: { type: DataTypes.INTEGER, allowNull: true },
    ModifiedBy: { type: DataTypes.INTEGER, allowNull: true },
    CreatedDate: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW },
    ModifiedDate: { type: DataTypes.DATE, allowNull: true },
    Options: { type: DataTypes.STRING, allowNull: true },
    BranchId: { type: DataTypes.STRING, allowNull: true },
    Dob: { type: DataTypes.DATE, allowNull: true },
    Area: { type: DataTypes.STRING, allowNull: true },
    UserType: { type: DataTypes.INTEGER, allowNull: true },
    PayMode: { type: DataTypes.STRING, allowNull: true },
    UnderUser: { type: DataTypes.INTEGER, allowNull: true },
    ProjectType: { type: DataTypes.STRING, allowNull: true },
    BeneficiaryId: { type: DataTypes.STRING, allowNull: true },
    Taluka: { type: DataTypes.STRING, allowNull: true },
    Village: { type: DataTypes.STRING, allowNull: true },
    District: { type: DataTypes.STRING, allowNull: true },
    PumpCapacity: { type: DataTypes.STRING, allowNull: true },
    RooftopPlantCapacity: { type: DataTypes.STRING, allowNull: true },
    Lattitude: { type: DataTypes.STRING, allowNull: true },
    Longitude: { type: DataTypes.STRING, allowNull: true },
    OffOnGrid: { type: DataTypes.STRING, allowNull: true },
    SanctionLoad: { type: DataTypes.STRING, allowNull: true },
    LoadExtension: { type: DataTypes.STRING, allowNull: true },
    WaterSource: { type: DataTypes.STRING, allowNull: true },
    SummerDepth: { type: DataTypes.STRING, allowNull: true },
    WinterDepth: { type: DataTypes.STRING, allowNull: true },
    PumpHead: { type: DataTypes.STRING, allowNull: true },
    BgNumber: { type: DataTypes.STRING, allowNull: true },
    BgValidity: { type: DataTypes.STRING, allowNull: true },
    BgClaimPeriod: { type: DataTypes.STRING, allowNull: true },
    InsuranceNumber: { type: DataTypes.STRING, allowNull: true },
    InsuranceAgency: { type: DataTypes.STRING, allowNull: true },
    InsuranceValidity: { type: DataTypes.STRING, allowNull: true },
    InstallationVendor: { type: DataTypes.STRING, allowNull: true },
    SurveyDetails: { type: DataTypes.INTEGER, allowNull: true },
    SchemeId: { type: DataTypes.INTEGER, allowNull: true },
    PumpHeadSelect: { type: DataTypes.STRING, allowNull: true },
    AcDc: { type: DataTypes.STRING, allowNull: true },
    Surface: { type: DataTypes.STRING, allowNull: true },
    AadharNo: { type: DataTypes.STRING, allowNull: true },
    AadharCard: { type: DataTypes.STRING, allowNull: true },
    AadharCard2: { type: DataTypes.STRING, allowNull: true },
    PanCard: { type: DataTypes.STRING, allowNull: true },
    PanCard2: { type: DataTypes.STRING, allowNull: true },
    GstCertificate: { type: DataTypes.STRING, allowNull: true },
    AccountName: { type: DataTypes.STRING, allowNull: true },
    BankName: { type: DataTypes.STRING, allowNull: true },
    AccountNo: { type: DataTypes.STRING, allowNull: true },
    IfscCode: { type: DataTypes.STRING, allowNull: true },
    Branch: { type: DataTypes.STRING, allowNull: true },
    UpiNo: { type: DataTypes.STRING, allowNull: true },
    GumastaNo: { type: DataTypes.STRING, allowNull: true },
    Gumasta: { type: DataTypes.STRING, allowNull: true },
    MsmeNo: { type: DataTypes.STRING, allowNull: true },
    Msme: { type: DataTypes.STRING, allowNull: true },
    InspectionDate: { type: DataTypes.DATE, allowNull: true },
    CommissioningDate: { type: DataTypes.DATE, allowNull: true },
    CustType: { type: DataTypes.INTEGER, allowNull: true },
    BoreDia: { type: DataTypes.STRING, allowNull: true },
    Details: { type: DataTypes.STRING, allowNull: true },
    CatId: { type: DataTypes.STRING, allowNull: true },
    CompName: { type: DataTypes.STRING, allowNull: true },
    CompAddress: { type: DataTypes.STRING, allowNull: true },
    CompPhone: { type: DataTypes.STRING, allowNull: true },
    AuthorName: { type: DataTypes.STRING, allowNull: true },
    Tokens: { type: DataTypes.STRING, allowNull: true },
    CompId: { type: DataTypes.INTEGER, allowNull: true },
    FatherPhone: { type: DataTypes.STRING, allowNull: true },
    Designation: { type: DataTypes.STRING, allowNull: true },
    BloodGroup: { type: DataTypes.STRING, allowNull: true },
    JoinDate: { type: DataTypes.DATE, allowNull: true },
    EmailId2: { type: DataTypes.STRING, allowNull: true },
    PerDaySalary: { type: DataTypes.FLOAT, allowNull: true },
    Barcode: { type: DataTypes.STRING, allowNull: true },
    KycStatus: { type: DataTypes.INTEGER, allowNull: true },
    KycDate: { type: DataTypes.DATE, allowNull: true },
    Profession: { type: DataTypes.STRING, allowNull: true },
    FsiicNo: { type: DataTypes.STRING, allowNull: true },
    ShopActNo: { type: DataTypes.STRING, allowNull: true },
    AnniversaryDate: { type: DataTypes.DATE, allowNull: true },
    ExeId: { type: DataTypes.INTEGER, allowNull: true },
    SellAmt: { type: DataTypes.FLOAT, allowNull: true },
    SellDate: { type: DataTypes.DATE, allowNull: true },
    UnderFr: { type: DataTypes.INTEGER, allowNull: true },
    ReportingMgr: { type: DataTypes.INTEGER, allowNull: true },
    ResignStatus: { type: DataTypes.INTEGER, allowNull: true },
    ResignDate: { type: DataTypes.DATE, allowNull: true },
    ResignComment: { type: DataTypes.STRING, allowNull: true },
    BillSoftFrId: { type: DataTypes.INTEGER, allowNull: true },
    PkgId: { type: DataTypes.INTEGER, allowNull: true },
    PkgAmt: { type: DataTypes.FLOAT, allowNull: true },
    PkgDiscount: { type: DataTypes.FLOAT, allowNull: true },
    PkgDate: { type: DataTypes.DATE, allowNull: true },
    PkgValidity: { type: DataTypes.DATE, allowNull: true },
    Prime: { type: DataTypes.INTEGER, allowNull: true },
    terms_condition: { type: DataTypes.STRING, allowNull: true },
    bottom_title: { type: DataTypes.STRING, allowNull: true },
    ReferCode: { type: DataTypes.STRING, allowNull: true },
    OwnFranchise: { type: DataTypes.INTEGER, allowNull: true },
    PrintCompName: { type: DataTypes.STRING, allowNull: true },
    PrintMobNo: { type: DataTypes.STRING, allowNull: true },
    TableQrCode: { type: DataTypes.STRING, allowNull: true },
    FoodLicence: { type: DataTypes.STRING, allowNull: true },
    FoodLicenceReceipt: { type: DataTypes.STRING, allowNull: true },
    AgreementCopy: { type: DataTypes.STRING, allowNull: true },
    SalaryType: { type: DataTypes.INTEGER, allowNull: true },
    CreditSalaryStatus: { type: DataTypes.INTEGER, allowNull: true },
    IdStatus: { type: DataTypes.INTEGER, allowNull: true },
    zone: { type: DataTypes.STRING, allowNull: true },
    CocoFranchiseAccess: { type: DataTypes.STRING, allowNull: true },
    CinNo: { type: DataTypes.STRING, allowNull: true },
    push_flag: { type: DataTypes.INTEGER, allowNull: true },
    delete_flag: { type: DataTypes.INTEGER, allowNull: true },
    modified_time: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW },
    UnderFrId: { type: DataTypes.INTEGER, allowNull: true },
    Location: { type: DataTypes.STRING, allowNull: true },
    ShowFrStatus: { type: DataTypes.INTEGER, allowNull: true },
    ReferalNo1: { type: DataTypes.STRING, allowNull: true },
    ReferalNo2: { type: DataTypes.STRING, allowNull: true },
    NomineePartnerName: { type: DataTypes.STRING, allowNull: true },
    NomineePartnerRelation: { type: DataTypes.STRING, allowNull: true },
    NomineePartnerPhone: { type: DataTypes.STRING, allowNull: true },
    BillAmount: { type: DataTypes.FLOAT, allowNull: true },
    ExpCatId: { type: DataTypes.STRING, allowNull: true },
    MainBrEmp: { type: DataTypes.INTEGER, allowNull: true },
    ExpApproval: { type: DataTypes.INTEGER, allowNull: true },
    UnderByUser: { type: DataTypes.INTEGER, allowNull: true },
    DeliveryPerson: { type: DataTypes.INTEGER, allowNull: true },
    TradeName: { type: DataTypes.STRING, allowNull: true },
    TypeOfVendor: { type: DataTypes.INTEGER, allowNull: true },
    RefPhone: { type: DataTypes.STRING, allowNull: true },
    RefPhone2: { type: DataTypes.STRING, allowNull: true },
    RefEmailId: { type: DataTypes.STRING, allowNull: true },
    AllocateProd: { type: DataTypes.STRING, allowNull: true },
    AllocateRawProd: { type: DataTypes.STRING, allowNull: true },
    Percentage: { type: DataTypes.STRING, allowNull: true },
    AuthToken: { type: DataTypes.STRING, allowNull: true },
    DeclarationPdf: { type: DataTypes.STRING, allowNull: true },
    NomineeName: { type: DataTypes.STRING, allowNull: true },
    NomineeRelation: { type: DataTypes.STRING, allowNull: true },
    NomineePhone: { type: DataTypes.STRING, allowNull: true },
    NomineeAadharNo: { type: DataTypes.STRING, allowNull: true },
    ZoneId: { type: DataTypes.INTEGER, allowNull: true },
    MonthlySalary: { type: DataTypes.STRING, allowNull: true },
    DeclarationPhoto: { type: DataTypes.STRING, allowNull: true },
    MgrCheckpoint: { type: DataTypes.STRING, allowNull: true },
    OtherEmp: { type: DataTypes.STRING, allowNull: true },
    },
    {
        sequelize,
        tableName: "tbl_users_bill",
        timestamps: false,
    }
);

export { UserBill };
