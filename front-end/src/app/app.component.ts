import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from './message.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subscription: Subscription;

  constructor (private ms: MessageService, private sb: MatSnackBar){
    this.subscription = this.ms.getMessage().subscribe(
      message => {
          this.openSnackBar(message['text'], 'OK');
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openSnackBar(message: string, action: string) {
    this.sb.open(message, action, {
      duration: 3000,
    });
  }

}
