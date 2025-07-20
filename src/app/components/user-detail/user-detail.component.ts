import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, LoadingComponent],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  user: User | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = this.getUserId();
    if (id) {
      this.loadUser(id);
    }
  }

  getUserId(): number {
    return Number(this.route.snapshot.paramMap.get('id'));
  }

  loadUser(id: number): void {
    this.loading = true;
    this.error = null;

    this.userService.getUser(id).subscribe({
      next: (user) => {
        this.user = user;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Kullanıcı bilgileri yüklenemedi';
        this.loading = false;
        console.error('Error:', error);
      },
    });
  }
}
