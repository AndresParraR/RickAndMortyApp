// constructor(public CharactersService: CharactersService) {}

// characters: any = [];

// page: number = 0;

// ngOnInit(): void {
//   this.CharactersService.getCharacters().subscribe((characters: any) => {
//     this.characters = characters;
//   });
// }

// array(int: number): Array<number> {
//   return new Array(int);
// }

// @HostListener('window:scroll')
// onWindowScroll(): void {
//   if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
//     this.page++;
//     this.CharactersService.getNextPageCharacters(this.page).subscribe(
//       (characters: any) => {
//         this.characters = this.characters.concat(characters);
//       }
//     );
//   }
// }

//   <div class="container-cards container-base">
//   <app-card *ngFor="let character of characters; let index = index" [item]="character"></app-card>
// </div>


// .container-cards{
//   display: grid;
//   gap: 2rem;
//   grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
// }