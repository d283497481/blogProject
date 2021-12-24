type RuleType = 'string' | 'number' | 'boolean' | 'array' | 'object';

export interface IRule {
  filed: string;
  type: RuleType;
  required: boolean;
  pattern?: RegExp;
  message?: string;
}
