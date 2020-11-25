import { Controller, Get } from '@nestjs/common';

import { apiDoc } from './docu';
import { ApiDoc } from './docu.interface';

@Controller()
export class DocController {
  @Get()
  getDoc(): ApiDoc {
    return apiDoc;
  }
}
