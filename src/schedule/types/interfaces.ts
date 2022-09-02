import { HealthCheckStatusType } from "@app/health/types/types";

export const MailSubjectTypeMap: { [status in HealthCheckStatusType]: string } = {
    [HealthCheckStatusType.ok]: "All of Service in UP",
    [HealthCheckStatusType.error]: "Some of Service is DOWN"
}