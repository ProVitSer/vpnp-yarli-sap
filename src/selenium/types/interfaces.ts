import { ApiExtensionStatus, PbxExtensionStatus } from "./type"

export interface ChangeStatusInfo {
    extension: number;
    status: ApiExtensionStatus;
}

export interface Capabilities {
    browserName: string;
    version: string;
    name: string;
    platform: string;
}

export interface SeleniumProviderInterface {
    seleniumChange(data: SeleniumDataTypes): Promise<any>;
}


export type SeleniumDataTypes  = ChangeStatusInfo


export const StatusMap : { [status in ApiExtensionStatus]: PbxExtensionStatus} = {
    [ApiExtensionStatus.available]: PbxExtensionStatus.Available,
    [ApiExtensionStatus.absent]: PbxExtensionStatus.Away,
    [ApiExtensionStatus.dnd]: PbxExtensionStatus.Outofoffice,
    [ApiExtensionStatus.lunch]: PbxExtensionStatus.CustomOne,
    [ApiExtensionStatus.businessTrip]: PbxExtensionStatus.Available,
}

