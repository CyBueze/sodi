import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHome(){
    return {pTitle: "Home"};
  }
  
  getAbout(){
    return {pTitle: "About"}
  }
}
