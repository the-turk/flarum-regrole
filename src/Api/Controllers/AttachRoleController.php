<?php

namespace IanM\RegRole\Api\Controllers;

use Flarum\Api\Controller\AbstractShowController;
use Illuminate\Contracts\Bus\Dispatcher;
use IanM\RegRole\Commands\AttachRole;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;
use Flarum\Api\Serializer\CurrentUserSerializer;

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
