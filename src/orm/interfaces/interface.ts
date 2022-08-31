
export interface ClParticipants {
    id: number;
    call_id: number;
    info_id: number;
    role: number;
    is_inbound: boolean,
    end_status: number;
    forward_reason: number;
    failure_reason: number;
    start_time: string | null;
    answer_time: string | null;
    end_time: string | null;
    billing_code: string | null;
    billing_ratename: string | null;
    billing_rate: string | null;
    billing_cost: string | null;
    billing_duration: string | null;
    recording_url: string | null;
    billing_group: string | null;
}


export interface ClPartyInfo {
    id: number;
    dn_type: number;
    dn: string | null;
    caller_number: string | null;
    display_name: string | null;
    dn_class: number;
    firstlastname: string | null;
    did_number: string | null;
}



