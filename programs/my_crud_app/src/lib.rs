use anchor_lang::prelude::*;

declare_id!("5M6eZAZGTHczF2JH3PEEWB5tEWxZmCepNHobjPDKjNVz");

#[program]
pub mod my_crud_app {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
