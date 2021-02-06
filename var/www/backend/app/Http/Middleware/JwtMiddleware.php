<?php

namespace App\Http\Middleware;

use Closure;
use Exception;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\ValidationData;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use App\Users;
use App\User;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // $token = $request->get('token');
        $token = $request->cookie('token');

        if (!$token) {
            return response()->json([
                'error' => 'Token not provided.'
            ], 401);
        }

        $signer = new Sha256();
        $data = new ValidationData();
        $data->setIssuer('http://localhost:8080');
        $data->setAudience('http://localhost:8080');
        $data->setCurrentTime(time() + 60);

        try {
            $token = (new Parser())->parse((string) $token);

            if (!$token->validate($data)) {
                throw new Exception('バリデーションエラーです。');
            }
            if (!$token->verify($signer, env('JWT_SECRET'))) {
                throw new Exception('署名のエラーです。');
            }

            // $user = Users::findOrFail($token->getClaim('user_id'));
            $user = $token->getClaim('user_id');

        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }

        $request->user = $user;

        return $next($request);
    }
}