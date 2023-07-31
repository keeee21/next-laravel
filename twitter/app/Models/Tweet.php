<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Tweet extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'text',
    ];

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    public function createTweet($tweetText)
    {
        $tweet = new self;
        $tweet->user_id = Auth::id();
        $tweet->tweet = $tweetText;
        $tweet->save();

        return $tweet;
    }
}
