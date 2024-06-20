import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Action } from './entity';

@Injectable()
class ActionService {
  constructor(@InjectRepository(Action) actionRepository) {
    this.actionRepository = actionRepository;
  }

  async createAction(userId, actionType, details) {
    console.log('userId: ' + userId);
    const action = this.actionRepository.create({
      user: { id: userId },
      action: actionType,
      details: details,
    });
    await this.actionRepository.save(action);

    return {
      userId,
      actionType,
      details,
    };
  }

  async getActionsByUserId(userId, page = 1, pageSize = 10) {
    const [result, total] = await this.actionRepository.findAndCount({
      where: { user: userId },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return {
      data: result,
      total,
      page,
      pageSize,
    };
  }
}

export default ActionService;
