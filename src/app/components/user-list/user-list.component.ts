import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, LoadingComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: User[] = []; // Tüm kullanıcılar
  filteredUsers: User[] = []; // Filtrelenmiş kullanıcılar
  loading: boolean = true;
  error: string | null = null;
  searchTerm: string = ''; // Arama terimi

  constructor(private userService: UserService) {}

  // React'teki useEffect gibi
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = null;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users; // Başlangıçta tüm kullanıcıları göster
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Kullanıcılar yüklenemedi';
        this.loading = false;
        console.error('Error:', error);
      },
    });
  }

  // Arama fonksiyonu
  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.filteredUsers = this.users;
    } else {
      this.filteredUsers = this.users.filter((user) =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  // Arama kutusunu temizle
  clearSearch(): void {
    this.searchTerm = '';
    this.filteredUsers = this.users;
  }

  // Performance için trackBy function
  trackByUserId(index: number, user: User): number {
    return user.id;
  }
}
