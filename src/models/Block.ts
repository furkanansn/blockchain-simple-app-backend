export default class Block {
  bits: number;
  confirmations: number;
  curr_max_timestamp: number;
  difficulty: number;
  difficulty_double: number;  
  hash: string;
  height: number;
  is_orphan: boolean;
  is_sw_block: boolean;
  mrkl_root: string;
  next_block_hash: string;
  nonce: number;
  pool_difficulty: number;
  prev_block_hash: string;
  reward_block: number;
  reward_fees: number;
  sigops: number;
  size: number;
  stripped_size: number;
  timestamp: number;
  tx_count: number;
  version: number;
  weight: number;
}


