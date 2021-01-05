<?php

/*
 * This file is part of ianm/flarum-regrole.
 *
 * Copyright (c) 2020 Hasan Özbey
 * Copyright (c) 2021 IanM
 *
 * LICENSE: For the full copyright and license information,
 * please view the LICENSE.md file that was distributed
 * with this source code.
 */

namespace IanM\RegRole\Api\Controllers;

use Flarum\Api\Controller\AbstractShowController;
use Flarum\Api\Serializer\CurrentUserSerializer;
use IanM\RegRole\Commands\AttachRole;
use Illuminate\Contracts\Bus\Dispatcher;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class AttachRoleController extends AbstractShowController
{
    /**
     * {@inheritdoc}
     */
    public $serializer = CurrentUserSerializer::class;

    /**
     * {@inheritdoc}
     */
    public $include = ['groups'];

    /**
     * @var Dispatcher
     */
    protected $bus;

    /**
     * @param Dispatcher $bus
     */
    public function __construct(Dispatcher $bus)
    {
        $this->bus = $bus;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');
        $roleIds = Arr::get($request->getParsedBody(), 'regRoleIds', []);

        return $this->bus->dispatch(
            new AttachRole($actor, $roleIds)
        );
    }
}
