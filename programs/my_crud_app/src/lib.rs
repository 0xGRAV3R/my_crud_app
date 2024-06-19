use anchor_lang::prelude::*;

declare_id!("5M6eZAZGTHczF2JH3PEEWB5tEWxZmCepNHobjPDKjNVz");

#[program]
pub mod my_crud_app {
    use super::*;

    pub fn create_item(ctx: Context<CreateItem>, data: String) -> Result<()> {
        let item = &mut ctx.accounts.item;
        item.data = data;
        Ok(())
    }

    pub fn update_item(ctx: Context<UpdateItem>, data: String) -> Result<()> {
        let item = &mut ctx.accounts.item;
        item.data = data;
        Ok(())
    }

    pub fn delete_item(_ctx: Context<DeleteItem>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateItem<'info> {
    #[account(init, payer = user, space = 8 + 64)]
    pub item: Account<'info, Item>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateItem<'info> {
    #[account(mut)]
    pub item: Account<'info, Item>,
}

#[derive(Accounts)]
pub struct DeleteItem<'info> {
    #[account(mut, close = user)]
    pub item: Account<'info, Item>,
    #[account(mut)]
    pub user: Signer<'info>,
}

#[account]
pub struct Item {
    pub data: String,
}
