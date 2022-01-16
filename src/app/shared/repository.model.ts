export class Repository {
  constructor(
    public name: String,
    public stargazers_count: Number,
    public forks: Number,
    public description: String,
    public html_url: String,
    public topic: [],
    public created_at: Date,
    public language?: String
  ) {}
}
