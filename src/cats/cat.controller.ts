import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CatService } from './cat.service';
import { CreateCat } from './create-cat.dto';
import { Request, Response } from 'express';
import { UpdateCat } from './update-cat.dto';
import { RolesGuard } from '../auth/roles/roles.guard';
import { CatFind } from './find-cat.dto';

@Controller('cats')
@UseGuards(RolesGuard)
export class CatController {
  constructor(private catService: CatService) {}

  @Post('/add')
  async createOneCat(@Body() cat: CreateCat, @Res() res: Response) {
    const result = await this.catService.addCat(cat);
    if (!result) {
      res.status(500).send('server error');
    }
    res.status(200).json(result);
  }

  @Get()
  async getCats(@Req() req: Request, @Res() res: Response) {
    console.log(req.user);
    const result = await this.catService.getAllCat();
    if (!result) {
      res.status(500).send('server error');
    }
    res.status(200).json(result);
  }

  @Post('/find')
  async findCatByName(@Body() catFind: CatFind, @Res() res: Response) {
    const result = await this.catService.getCatByName(catFind.name);
    if (!result) {
      res.status(500).send('server error');
    }
    res.status(200).json(result);
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    const cat = await this.catService.getCatById(id);
    if (!cat) {
      res.status(500).send('server error');
    }
    res.status(200).json(cat);
  }

  @Put('/update/:id')
  async updateCat(
    @Param('id') id: number,
    @Body() updateCatDTO: UpdateCat,
    @Res() res: Response,
  ) {
    const result = await this.catService.updateCatById(id, updateCatDTO);
    if (!result) {
      res.status(500).send('server error');
    }
    res.status(200).json(result);
  }

  @Delete('/delete/:id')
  async deleteCat(@Param('id') id: number, @Res() res: Response) {
    const result = await this.catService.deleteCatById(id);
    if (!result) {
      res.status(500).send('server error');
    }
    res.status(200).json(result);
  }
}
