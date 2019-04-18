import { NgModule } from '@angular/core';
import { ImagePipe } from './image.pipe';

const PIPES = [
  ImagePipe
];

@NgModule({
  declarations: PIPES,
  imports: [],
  exports: PIPES
})
export class PipesModule { }
