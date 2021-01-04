<?php

namespace IanM\RegRole\Validators;

use Flarum\Foundation\AbstractValidator;

class RoleValidator extends AbstractValidator
{
    /**
     * {@inheritdoc}
     */
    protected $rules = [
        'regRole' => ['required'],
    ];

    /**
     * {@inheritdoc}
     */
    protected function getMessages()
    {
        return [
          'required' =>
            $this->translator->trans(
                'the-turk-regrole.forum.requiredRegRole'
            )
        ];
    }
}
