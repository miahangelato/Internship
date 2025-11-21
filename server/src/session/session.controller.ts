import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { ApiResponse } from '../common/api-response';

@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  // POST /sessions
  @Post()
  async create(@Body() createSessionDto: CreateSessionDto) {
    const data = await this.sessionService.create(createSessionDto);
    return ApiResponse.success(data);
  }

  // GET /sessions/:session_token
  @Get(':session_token')
  async findByToken(@Param('session_token') token: string) {
    const data = await this.sessionService.findByToken(token);
    return ApiResponse.success(data);
  }

  // DELETE /sessions/:session_token
  @Delete(':session_token')
  async endSession(@Param('session_token') token: string) {
    const data = await this.sessionService.endSessionByToken(token);
    return ApiResponse.success(data);
  }
}
