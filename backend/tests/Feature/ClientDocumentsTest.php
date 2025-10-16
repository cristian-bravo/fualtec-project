<?php

describe('Client documents', function () {
    it('rejects unauthenticated downloads', function () {
        $response = $this->get('/api/v1/client/documents');

        expect($response->status())->toBe(302);
    })->skip('Requires application bootstrap');
});
