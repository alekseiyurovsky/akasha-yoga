import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { Express } from 'express';
import { Multer } from 'multer';
import FormData from "form-data";
import {firstValueFrom} from 'rxjs';
import {Repository} from 'typeorm';
import { HttpService } from '@nestjs/axios';
import {Training} from '../../app/typeorm/entities/Training';
import {CreateTrainingDto} from '../dtos/CreateTraining.dto';
import {PatchTrainingDto} from '../dtos/PatchTraining.dto';

@Injectable()
export class TrainingsService {
  constructor(
    @InjectRepository(Training) private trainingRepository: Repository<Training>,
    private readonly httpService: HttpService,
  ) {}

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
    const training = this.trainingRepository.create(trainingDetails,);
    return this.trainingRepository.save(training);
  }

  public updateTraining(id: number, patchTrainingDetails: Partial<PatchTrainingDto>) {
    return this.trainingRepository.update({id}, {...patchTrainingDetails});
  }

  public async uploadPic(
    pic: Express.Multer.File,
    id: number,
  ): Promise<any> {
    const training = await this.findOne(id);
    if (!training) {
      throw 'User not found';
    }
    const formData = new FormData();
    formData.append('image', pic.buffer.toString('base64'));
    const { data: imageData } = await firstValueFrom(
      this.httpService
        .post(
          `https://api.imgbb.com/1/upload?expiration=600&key=f256a8d21dd1702a0f500d163123f512`,
          formData,
        )
    );
    await this.updateTraining(id, { image_url: imageData.data.url });
    return imageData;
  }
}
