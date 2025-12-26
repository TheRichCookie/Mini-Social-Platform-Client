import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'hang-friend',
  imports: [RouterOutlet],
  templateUrl: './friend.component.html',
  styleUrl: './friend.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HangFriendComponent {}
