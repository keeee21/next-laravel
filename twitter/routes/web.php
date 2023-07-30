<?php

use App\Http\Controllers\TweetController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::group(['middleware' => 'auth'], function(){
    Route::get('/dashboard', [TweetController::class, 'dashboard'])->name('dashboard');
    Route::get('/tweets', [TweetController::class, 'index'])->name('index');
    Route::post('postTweet', [TweetController::class, 'store'])->name('store');
});

require __DIR__.'/auth.php';
