export interface INetworkType {
  type: string;
  name: string;
  description: string;
}

export class NetworkType {
  static readonly INNER_CIRCLE: INetworkType = {
    type: 'inner-circle',
    name: 'Inner Circle',
    description: 'Close family members and friends',
  };

  static readonly HIGH_TRUST_PROFESSIONALS: INetworkType = {
    type: 'high-trust-professionals',
    name: 'High Trust Professionals',
    description: 'Trusted Professional and Advisor Contacts',
  };

  static readonly CURRENT_CLIENTS: INetworkType = {
    type: 'current-clients',
    name: 'Current Clients',
    description: 'Current Client and Customers',
  };

  static readonly PAST_CLIENTS: INetworkType = {
    type: 'past-clients',
    name: 'Past Clients',
    description: 'Previous Client and Customers',
  };
  
  static readonly EXECUTIVE_TEAM: INetworkType = {
    type: 'executive-team',
    name: 'Executive Team',
    description: 'Current Executive Team Members and Leaderships',
  };

  static readonly WORK_COLLEAGUES: INetworkType = {
    type: 'work-colleagues',
    name: 'Work Colleagues',
    description: 'Current and Past Work Colleagues',
  };

  static readonly INVESTORS: INetworkType = {
    type: 'investors',
    name: 'Investors',
    description: 'Current and Potential Investors',
  };

  static readonly BOARD_MEMBERS: INetworkType = {
    type: 'board-members',
    name: 'Board of Advisors/Directors',
    description: 'Board Members and Advisors',
  };

  static readonly REFERALS: INetworkType = {
    type: 'referals',
    name: 'Strategic/Referrals Partners',
    description: 'Strategic/Referrals Partners and Business Sources',
  };

  static readonly MENTORS: INetworkType = {
    type: 'mentors',
    name: 'Personal/Professional Mentors',
    description: 'Mentors and advisors who guide you career',
  };

  static getAllNetworkTypes(): INetworkType[] {
    return [
      NetworkType.INNER_CIRCLE,
      NetworkType.HIGH_TRUST_PROFESSIONALS,
      NetworkType.CURRENT_CLIENTS,
      NetworkType.PAST_CLIENTS,
      NetworkType.EXECUTIVE_TEAM,
      NetworkType.WORK_COLLEAGUES,
      NetworkType.INVESTORS,
      NetworkType.BOARD_MEMBERS,
      NetworkType.REFERALS,
      NetworkType.MENTORS,
    ];
  }

  static findTypeByValue(value: string): INetworkType | null {
    return this.getAllNetworkTypes().find((t) => t.type === value) || null;
  }
}
