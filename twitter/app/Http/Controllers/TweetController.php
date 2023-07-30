<?php

namespace App\Http\Controllers;

use App\Models\Tweet;
use Illuminate\Http\Request;

class TweetController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function dashboard()
    {
        return response()->json("ok");
    }

    public function index()
    {
        $tweets = Tweet::orderBy('created_at', 'desc')->get();
        return response()->json($tweets);
    }
}
