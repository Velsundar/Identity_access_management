import { v4 as uuidv4 } from 'uuid';
import { get } from 'lodash';
import ClientModel from './models/client.model';
import { DUPLICATE_VALUE, ERROR } from '../config/stringConsent';

const createClient = async (clientData: any) => {
  console.log("JHV",clientData?.mobileNumber)
  try {
    const getCreatedBy = get(clientData, 'createdBy.email', '');

    const client = {
      clientId: clientData?.client_ref_id || uuidv4(),
      email: clientData?.email,
      leadId: clientData?.leadId,
      uniqueId: clientData?.uniqueId,
      productId: clientData?.productId,
      mobileNumber: clientData?.mobileNumber,
      walletType: clientData?.walletType,
      name: clientData?.name,
      businessName: clientData?.businessName,
      businessType: clientData?.businessType,
      businessPan: clientData?.businessPan,
      gstNumber: clientData?.gstNumber,
      businessAddress: clientData?.businessAddress,
      businessLocation: clientData?.businessLocation,
      directorName: clientData?.directorName,
      companyWebsite: clientData?.companyWebsite,
      industryType: clientData?.industryType,
      industrySegment: clientData?.industrySegment,
      isFreeCredit: clientData?.isFreeCredit || true,
      stage: clientData?.stage || 'LEAD',
      createdAt: new Date(),
      solutionType: clientData?.solutionType || 'SAAS',
      minimumPull: clientData?.minimumPull,
      totalOneTimeCredit: clientData?.totalOneTimeCredit || 0,
      createdBy: getCreatedBy,
      prefundAmount: clientData?.prefundAmount,
      onBoardedBy: getCreatedBy === clientData?.email ? 'self' : 'sales',
      resellerId: clientData?.resellerId,
      source: clientData?.source,
      portal: clientData?.portal,
    };

    const createdClient = await ClientModel.create(client);
    return { 
      data: createdClient, 
      status: 'SUCCESS', 
      msg: 'Client created successfully' 
    }; 
  } catch (error: any) {
    console.error("Error creating client:", error); // Log the error object
    if (error.code === 11000) {
      return { 
        data: '', 
        status: ERROR, 
        msg: DUPLICATE_VALUE 
      }; // Handle duplicate error
    }
    return { 
      data: '', 
      status: ERROR, 
      msg: error.message || error.toString() 
    }; // Return error message
  }
};

export { createClient };
