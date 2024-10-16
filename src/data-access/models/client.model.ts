import { ClientType } from 'src/types/clients/client.types';
import { paginate } from '../../utils/paginate.manager';
import mongoose from 'mongoose';
const uuid = require('uuid');

export const ClientSchema = new mongoose.Schema(
  {
    clientId: { type: String }, //primary key for profileX secondary key for CORE system
    client_ref_id: { type: String },
    leadId: { type: String },
    productId: { type: String },
    uniqueId: { type: String },
    resellerId: { type: String },
    /**
     * mandotory
     * email
     * mobileNumber
     * name
     */
    email: { type: String },
    mobileNumber: { type: String },
    name: { type: String },
    bankAccDetails: {
      type: Array,
    },
    //business details
    businessName: { type: String },
    businessType: { type: String },
    businessPan: { type: String },
    totalOneTimeCredit: { type: Number },
    gstNumber: { type: String },
    businessAddress: { type: String },
    businessLocation: { type: String },
    cinNumber: { type: String },
    directorName: { type: String },
    dinNumber: { type: String },
    companyWebsite: { type: String },
    industryType: { type: String },
    industrySegment: { type: String },
    //onboarding details
    isFreeCredit: { type: Boolean, default: false },
    profilexClientCallback: { type: String },
    onBoardedBy: { type: String, enum: ['self', 'sales'], default: 'self' },
    solutionType: {
      type: String,
      enum: ['SAAS', 'API', 'SDK', 'Bundles'],
      default: 'SAAS',
    },
    //for payment
    vanAccNum: {
      type: String,
    },
    bankDetails: {
      type: Array,
    },
    stage: {
      type: String,
      enum: ['LEAD', 'UAT', 'PROD', 'RNCPENDING', 'LIVE', 'REJECTED'],
      default: 'LEAD',
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'INACTIVE', 'DEACTIVATED'],
      default: 'ACTIVE',
    },
    services: [
      {
        pricingId: {
          type: String,
          default: function getUUID() {
            return uuid.v4();
          },
        },
        requestedStatus: {
          type: String,
          enum: ['uatRequested', 'prodRequested', 'accepted', 'rejected'],
        },
        apiRequested: {
          type: Boolean,
        },
        enterpriseRequested: {
          type: Object,
        },
        serviceId: {
          type: String,
        },
        isBookMarked: {
          type: Boolean,
          default: false,
        },
        bookMarkedAt: { type: Date },
        priceType: {
          type: String,
          enum: ['fixed', 'slab'],
        },
        solutionType: {
          type: String,
          enum: ['SAAS', 'API', 'SDK', 'Bundles'],
        },
        uatFreeCreditsUpdated: {
          type: Number,
        },
        isHidden: {
          type: Boolean,
          default: false,
        },
        stage: {
          type: String,
          enum: ['LEAD', 'UAT', 'PROD', 'RNCPENDING', 'LIVE'],
        },
        status: {
          type: String,
          enum: ['active', 'inactive', 'deactive'],
          default: 'active',
        },
        charges: [
          {
            chargesId: {
              type: String,
              default: function getUUID() {
                return uuid.v4();
              },
            },
            minValue: { type: String },
            maxValue: { type: String },
            price: { type: Number },
            isBeyond: { type: Boolean },
          },
        ],
      },
    ],
    minimumPull: {
      type: Array,
    },
    documents: {
      type: Array,
    },
    toDate: {
      type: Date,
    },
    fromDate: {
      type: Date,
    },
    /**
     * while sales onboarding with kyc verification and preload the wallet
     */

    pullFrequency: {
      type: String,
    },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    createdBy: {
      type: String,
    },
    updatedBy: {
      type: String,
      required: false,
    },
    updatedAt: { type: Date },
    walletTypeChangeDate: { Type: Date },
    isQuickTour: {
      type: Boolean,
      default: false,
    },
    leadFreeCredits: {
      Type: Boolean,
    },
    freeCredits: {
      Type: Number,
    },
    prepaidPricing: {
      prefundAmount: { type: Number, default: 999 },
      rechargePlanId: { type: String },
      isEnterprise: { type: Boolean, default: false },
    },
    postPaidPricing: {
      priceType: { type: String },
      pricing: [
        {
          startDate: { type: Date },
          toDate: { type: Date },
          price: { type: Number },
          isBeyond: { type: Boolean },
        },
      ],
    },
    lastNotificationThreshold: { type: Number, default: null },
  },
  { timestamps: true }
);

ClientSchema.plugin(paginate);

const ClientModel = mongoose.model<ClientType>('clients', ClientSchema);

export default ClientModel;
