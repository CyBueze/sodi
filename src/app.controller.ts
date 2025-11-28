import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render("pages/index")
  getHomePage(): any {
    return this.appService.getHome();
  }
  
  @Get("/about")
  @Render("pages/aboutPage")
  getAboutPage(){
    return this.appService.getAbout()
  }
}
