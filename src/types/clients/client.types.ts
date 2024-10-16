import { Type, Static } from '@sinclair/typebox';

// Define the bank account details schema if needed
const BankAccountDetails = Type.Array(Type.Object({
  accountNumber: Type.String(),
  accountHolderName: Type.String(),
  bankName: Type.String(),
  ifscCode: Type.String(),
}));

// Define Services Charges Schema
const ChargesSchema = Type.Object({
  chargesId: Type.String(
    
  ),
  minValue: Type.String(),
  maxValue: Type.String(),
  price: Type.Number(),
  isBeyond: Type.Boolean(),
});

// Define Services Schema
const ServiceSchema = Type.Object({
  pricingId: Type.String(),
  requestedStatus: Type.Optional(
    Type.Union([
      Type.Literal('uatRequested'),
      Type.Literal('prodRequested'),
      Type.Literal('accepted'),
      Type.Literal('rejected'),
    ])
  ),
  apiRequested: Type.Boolean(),
  enterpriseRequested: Type.Optional(Type.Object({})), // Example placeholder for object schema
  serviceId: Type.String(),
  isBookMarked: Type.Boolean({ default: false }),
  bookMarkedAt: Type.Optional(Type.Date()),
  priceType: Type.Optional(
    Type.Union([Type.Literal('fixed'), Type.Literal('slab')])
  ),
  solutionType: Type.Optional(
    Type.Union([Type.Literal('SAAS'), Type.Literal('API'), Type.Literal('SDK'), Type.Literal('Bundles')])
  ),
  uatFreeCreditsUpdated: Type.Optional(Type.Number()),
  isHidden: Type.Boolean({ default: false }),
  stage: Type.Optional(
    Type.Union([Type.Literal('LEAD'), Type.Literal('UAT'), Type.Literal('PROD'), Type.Literal('RNCPENDING'), Type.Literal('LIVE')])
  ),
  status: Type.Optional(
    Type.Union([Type.Literal('active'), Type.Literal('inactive'), Type.Literal('deactive')])
  ),
  charges: Type.Array(ChargesSchema),
});

// Client Schema Definition
const ClientSchema = Type.Object({
  clientId: Type.Optional(Type.String()),
  client_ref_id: Type.Optional(Type.String()),
  leadId: Type.Optional(Type.String()),
  productId: Type.Optional(Type.String()),
  uniqueId: Type.Optional(Type.String()),
  resellerId: Type.Optional(Type.String()),
  email: Type.String(),
  mobileNumber: Type.String(),
  name: Type.String(),
  bankAccDetails: BankAccountDetails, // Array of bank account details
  businessName: Type.Optional(Type.String()),
  businessType: Type.Optional(Type.String()),
  businessPan: Type.Optional(Type.String()),
  totalOneTimeCredit: Type.Optional(Type.Number()),
  gstNumber: Type.Optional(Type.String()),
  businessAddress: Type.Optional(Type.String()),
  businessLocation: Type.Optional(Type.String()),
  cinNumber: Type.Optional(Type.String()),
  directorName: Type.Optional(Type.String()),
  dinNumber: Type.Optional(Type.String()),
  companyWebsite: Type.Optional(Type.String()),
  industryType: Type.Optional(Type.String()),
  industrySegment: Type.Optional(Type.String()),
  isFreeCredit: Type.Optional(Type.Boolean({ default: false })),
  profilexClientCallback: Type.Optional(Type.String()),
  onBoardedBy: Type.Optional(
    Type.Union([Type.Literal('self'), Type.Literal('sales')])
  ),
  solutionType: Type.Optional(
    Type.Union([
      Type.Literal('SAAS'),
      Type.Literal('API'),
      Type.Literal('SDK'),
      Type.Literal('Bundles'),
    ])
  ),
  vanAccNum: Type.Optional(Type.String()),
  bankDetails: Type.Optional(Type.Array(Type.Object({}))),
  stage: Type.Optional(
    Type.Union([
      Type.Literal('LEAD'),
      Type.Literal('UAT'),
      Type.Literal('PROD'),
      Type.Literal('RNCPENDING'),
      Type.Literal('LIVE'),
      Type.Literal('REJECTED'),
    ])
  ),
  status: Type.Optional(
    Type.Union([Type.Literal('ACTIVE'), Type.Literal('INACTIVE'), Type.Literal('DEACTIVATED')])
  ),
  services: Type.Array(ServiceSchema),
  minimumPull: Type.Optional(Type.Array(Type.Object({}))),
  documents: Type.Optional(Type.Array(Type.Object({}))),
  toDate: Type.Optional(Type.Date()),
  fromDate: Type.Optional(Type.Date()),
  pullFrequency: Type.Optional(Type.String()),
  isDeleted: Type.Optional(Type.Boolean({ default: false })),
  createdAt: Type.Optional(Type.Date({ default: Date.now })),
  createdBy: Type.Optional(Type.String()),
  updatedBy: Type.Optional(Type.String()),
  updatedAt: Type.Optional(Type.Date()),
  walletTypeChangeDate: Type.Optional(Type.Date()),
  isQuickTour: Type.Optional(Type.Boolean({ default: false })),
  leadFreeCredits: Type.Optional(Type.Boolean()),
  freeCredits: Type.Optional(Type.Number()),
  prepaidPricing: Type.Optional(
    Type.Object({
      prefundAmount: Type.Number({ default: 999 }),
      rechargePlanId: Type.Optional(Type.String()),
      isEnterprise: Type.Optional(Type.Boolean({ default: false })),
    })
  ),
  postPaidPricing: Type.Optional(
    Type.Object({
      priceType: Type.Optional(Type.String()),
      pricing: Type.Array(
        Type.Object({
          startDate: Type.Optional(Type.Date()),
          toDate: Type.Optional(Type.Date()),
          price: Type.Number(),
          isBeyond: Type.Optional(Type.Boolean()),
        })
      ),
    })
  ),
  lastNotificationThreshold: Type.Optional(Type.Number({ default: null })),
}, { additionalProperties: false });

export type ClientType = Static<typeof ClientSchema>;
export default ClientSchema;
