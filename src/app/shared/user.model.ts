export class User {
  constructor(
    public name: String,
    public avatar_url: String,
    public followers: String,
    public following: String,
    public public_repos: Number,
    public bio: String,
    public location: String,
    public created_at: Date
  ) {}
}
