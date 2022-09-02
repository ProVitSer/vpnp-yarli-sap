import { HealthCheckStatusType } from "./types";

export interface HealthCheckMailFormat {
    status: HealthCheckStatusType;
    service: Array<ServiceInfo>

}
export interface ServiceInfo {
    serviceName: string;
    status: string;
    details?: string;
}