import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Router } from '@angular/router';

import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/shared/models/user.model';
import { TalkService } from 'src/app/core/services/talk.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User;

  constructor(
    private userService: UserService,
    private talkService: TalkService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() { 
    this.userService.getUser(this.getUserId()).then(user => {
      this.user = user;
      this.loadChatbox(this.user);
    });
  }

  private async loadChatbox(otherUser: User) {
    const chatbox = await this.talkService.createChatbox(otherUser);
    chatbox.mount(document.getElementById('talkjs-container'));
  }

  private getUserId() {
    return Number(this.route.snapshot.paramMap.get('id'));
  }

  goToProductPage(product: Product) {
    this.router.navigate(['products/' + product.id]);
  }

}
