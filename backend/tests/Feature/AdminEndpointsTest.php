<?php

describe('Admin endpoints', function () {
    it('requires authentication for approvals', function () {
        $response = $this->getJson('/api/v1/admin/approvals');

        expect($response->status())->toBe(401);
    })->skip('Requires application bootstrap');
});
