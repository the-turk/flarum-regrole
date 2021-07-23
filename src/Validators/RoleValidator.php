<?php

/*
 * This file is part of Registration Roles.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace TheTurk\RegRole\Validators;

use Flarum\Foundation\AbstractValidator;

class RoleValidator extends AbstractValidator
{
    /**
     * {@inheritdoc}
     */
    protected $rules = [
        'regrole_role_ids' => ['required', 'array'],
    ];

    /**
     * {@inheritdoc}
     */
    protected function getMessages(): array
    {
        return [
            'required' => $this->translator->trans('the-turk-regrole.forum.required_role_message'),
        ];
    }
}
