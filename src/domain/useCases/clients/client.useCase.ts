import { createClient } from "../../../data-access/client";

const createClientUsecase = async (clientData: any) => {
  return await createClient(clientData); // Return the result directly
};

export default createClientUsecase;
