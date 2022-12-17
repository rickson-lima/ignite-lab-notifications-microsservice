import { randomUUID } from 'crypto';
import { Body, Controller, Get, Post } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { CreateNotificationBody } from './create-notification-body';

@Controller('notification')
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  list() {
    return this.prismaService.notification.findMany();
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { category, content, recipientId } = body;

    await this.prismaService.notification.create({
      data: {
        id: randomUUID(),
        content,
        category,
        recipientId,
      },
    });
  }
}
