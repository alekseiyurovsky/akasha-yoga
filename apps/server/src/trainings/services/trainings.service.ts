import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Training} from '../../app/typeorm/entities/Training';
import {CreateTrainingDto} from '../dtos/CreateTraining.dto';
import {PatchTrainingDto} from '../dtos/PatchTraining.dto';

@Injectable()
export class TrainingsService {
  constructor(@InjectRepository(Training) private trainingRepository: Repository<Training>) {}

  public findTrainings() {
    return this.trainingRepository.find({
      select: {
        author: {
          name: true,
          surname: true
        }
      },
      relations: ['author']
    });
  }

  public findOne(id: number): Promise<Training> {
    return this.trainingRepository.findOne({
      where: {id},
      select: {
        author: {
          name: true,
          surname: true
        }
      },
      relations: ['author']
    });
  }

  public createTraining(trainingDetails: CreateTrainingDto) {
    const training = this.trainingRepository.create({
      ...trainingDetails,
      date_added: new Date().toUTCString()
    });
    return this.trainingRepository.save(training);
  }

  public updateTraining(id: number, patchTrainingDetails: Partial<PatchTrainingDto>) {
    return this.trainingRepository.update({id}, {...patchTrainingDetails});
  }
}
