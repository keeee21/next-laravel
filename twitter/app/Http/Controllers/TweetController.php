<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTweetRequest;
use App\Models\Tweet;
use Exception;
use Illuminate\Support\Facades\Log;

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

    /**
     * Show all tweets in dashboard
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $tweets = Tweet::orderBy('created_at', 'desc')->get();
        return response()->json($tweets);
    }

    /**
     * Store tweet to DB
     *
     * @param StoreTweetRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreTweetRequest $request)
    {
        try {
            $tweet = new Tweet();
            $tweet->createTweet($request->input('tweet'));
        } catch (Exception $e) {
            Log::error($e);
            return response()->json(["status" => 500 ,"message" => "Failed to tweet"]);
        }

        return response()->json(["status" => 200 ,'message' => 'Tweet posted successfully']);
    }
}
